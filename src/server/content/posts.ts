import fs from 'node:fs';
import path from 'node:path';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

const publicPostsDirectory = path.join(process.cwd(), 'public', 'posts');

export interface PostFrontmatter {
  author: string;
  date: string;
  title: string;
  canonicalLink?: string;
  draft: boolean;
  tags: string[];
  description?: string;
  featuredImage?: string;
  lastModified?: string;
  category?: string;
  [key: string]: unknown;
}

export interface PostSummary {
  slug: string;
  frontmatter: PostFrontmatter;
}

export interface Post extends PostSummary {
  content: MDXRemoteSerializeResult;
}

export function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? new Date(0) : date;
}

export function parseFrontmatter(fileContent: string): {
  data: PostFrontmatter;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return {
      data: {} as PostFrontmatter,
      content: fileContent,
    };
  }

  const frontmatter = match[1];
  const content = fileContent.replace(frontmatterRegex, '');
  const data = {} as PostFrontmatter;

  frontmatter.split('\n').forEach((line) => {
    const [key, ...valueArr] = line.split(':');

    if (!key || valueArr.length === 0) {
      return;
    }

    const trimmedKey = key.trim();
    const value = valueArr.join(':').trim();

    switch (trimmedKey) {
      case 'draft':
        data[trimmedKey] = value.toLowerCase() === 'true';
        break;
      case 'tags':
        data[trimmedKey] = value
          .replace(/[\[\]']/g, '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean);
        break;
      case 'date':
      case 'lastModified':
        data[trimmedKey] = new Date(value).toISOString().split('T')[0];
        break;
      default:
        data[trimmedKey] = value;
    }
  });

  return { data, content };
}

function transformLegacyInlineStyles(content: string): string {
  return content.replace(/style="([^"]*)"/g, (_, styleValue: string) => {
    const styleObject = styleValue
      .split(';')
      .map((rule) => rule.trim())
      .filter(Boolean)
      .map((rule) => {
        const [property, ...valueParts] = rule.split(':');
        const camelCaseProperty = property
          .trim()
          .replace(/-([a-z])/g, (_match, character: string) =>
            character.toUpperCase()
          );
        const value = valueParts.join(':').trim();
        return `${camelCaseProperty}: ${JSON.stringify(value)}`;
      })
      .join(', ');

    return `style={{ ${styleObject} }}`;
  });
}

export async function getAllPosts(): Promise<PostSummary[]> {
  if (!fs.existsSync(publicPostsDirectory)) {
    return [];
  }

  const folders = fs.readdirSync(publicPostsDirectory);
  const posts = folders
    .map((folder) => {
      const fullPath = path.join(publicPostsDirectory, folder, 'index.mdx');

      if (!fs.existsSync(fullPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = parseFrontmatter(fileContents);

      return {
        slug: folder,
        frontmatter: data,
      };
    })
    .filter(Boolean) as PostSummary[];

  return posts.sort(
    (a, b) =>
      parseDate(b.frontmatter.date).getTime() -
      parseDate(a.frontmatter.date).getTime()
  );
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(publicPostsDirectory, slug, 'index.mdx');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = parseFrontmatter(fileContents);
  const normalizedContent = transformLegacyInlineStyles(content);

  const mdxSource = await serialize(normalizedContent, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    slug,
    frontmatter: data,
    content: mdxSource,
  };
}
