import Link from 'next/link';
import { getAllPosts } from '@/server/api/posts';

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="my-16">
          <Link href={`/articles/${post.slug}`}>
            {post.frontmatter.title || 'Untitled Post'}
          </Link>
          {post.frontmatter.date && <span> - {post.frontmatter.date}</span>}
          {post.frontmatter.author && (
            <span> by {post.frontmatter.author}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
