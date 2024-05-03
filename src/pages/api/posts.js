import { getFiles, getFileBySlug } from '../../lib/mdx';

export default async function handler(req, res) {
  const slugs = await getFiles('src/posts');
  const posts = await Promise.all(slugs.map(slug => getFileBySlug('/src/posts', slug)));

  res.status(200).json(posts);
  
//   console.log(posts,'posts')
//   console.log(slugs,'slugs')
}