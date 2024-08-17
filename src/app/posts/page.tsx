import Link from 'next/link';
import { getAllPosts } from '@/server/api/posts';

function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date(0) : date; // Default to epoch if invalid
}

export default async function BlogIndex() {
  const posts = await getAllPosts();

  // Sort posts by date, newest first
  posts.sort((a, b) => parseDate(b.frontmatter.date).getTime() - parseDate(a.frontmatter.date).getTime());

  return (
    <ul className='col-start-3 col-span-3'>
      {posts.map((post) => (
        <li key={post.slug} className="my-16 flex flex-col gap-4">
          <Link href={`/posts/${post.slug}`}>
            {post.frontmatter.title || 'Untitled Post'}
          </Link>
        </li>
      ))}
    </ul>
  );
}
