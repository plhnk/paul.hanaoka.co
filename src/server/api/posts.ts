import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

const publicPostsDirectory = path.join(process.cwd(), 'public', 'posts')

interface Frontmatter {
  author: string;
  date: string;
  title: string;
  canonicalLink?: string;
  draft: boolean;
  tags: string[];
  description?: string;
  lastModified?: string;
  category?: string;
  [key: string]: unknown;
}

function parseFrontmatter(fileContent: string): { data: Frontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
  const match = frontmatterRegex.exec(fileContent)
  if (!match) return { data: {} as Frontmatter, content: fileContent }

  const frontmatter = match[1]
  const content = fileContent.replace(frontmatterRegex, '')

  const data: Frontmatter = {} as Frontmatter
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueArr] = line.split(':')
    if (key && valueArr.length) {
      const value = valueArr.join(':').trim()
      switch (key.trim()) {
        case 'draft':
          data[key.trim()] = value.toLowerCase() === 'true'
          break
        case 'tags':
          data[key.trim()] = value.replace(/[\[\]']/g, '').split(',').map(tag => tag.trim())
          break
        case 'date':
        case 'lastModified':
          data[key.trim()] = new Date(value).toISOString().split('T')[0]
          break
        default:
          data[key.trim()] = value
      }
    }
  })

  return { data, content }
}

export async function getAllPosts(): Promise<{ slug: string; frontmatter: Frontmatter }[]> {
  if (!fs.existsSync(publicPostsDirectory)) {
    console.error(`Directory not found: ${publicPostsDirectory}`)
    return []
  }

  const folders = fs.readdirSync(publicPostsDirectory)

  return folders.map((folder) => {
    const fullPath = path.join(publicPostsDirectory, folder, 'index.mdx')
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fullPath}`)
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = parseFrontmatter(fileContents)

    return {
      slug: folder,
      frontmatter: data,
    }
  }).filter(Boolean) as { slug: string; frontmatter: Frontmatter }[]
}

export async function getPost(slug: string): Promise<{
  slug: string;
  frontmatter: Frontmatter;
  content: MDXRemoteSerializeResult;
}> {
  const fullPath = path.join(publicPostsDirectory, slug, 'index.mdx')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = parseFrontmatter(fileContents)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    slug,
    frontmatter: data,
    content: mdxSource,
  }
}