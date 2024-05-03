import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

// getFiles function is used to read the names of all files in a directory
export function getFiles(directory) {
  return fs.readdirSync(path.join(process.cwd(), directory));
}
// console.log(getFiles('src/posts'));

export async function getFileBySlug(directory, slug) {
  const file = fs.readFileSync(
    path.join(process.cwd(), directory, `${slug}/index.mdx`),
    'utf-8'
  );
  const { data, content } = matter(file);
  const mdxSource = await serialize(content);

  return {
    slug,
    mdxSource,
    frontMatter: data,
  };
}
