import fs from 'fs'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

const publicPostsDirectory = path.join(process.cwd(), 'public', 'posts')

interface Frontmatter {
  [key: string]: string;
}

function parseFrontmatter(fileContent: string): { data: Frontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/
  const match = frontmatterRegex.exec(fileContent)
  if (!match) return { data: {}, content: fileContent }

  const frontmatter = match[1]
  const content = fileContent.replace(frontmatterRegex, '')

  const data: Frontmatter = {}
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueArr] = line.split(':')
    if (key && valueArr.length) {
      data[key.trim()] = valueArr.join(':').trim()
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
