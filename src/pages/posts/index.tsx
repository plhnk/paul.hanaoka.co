import Link from 'next/link';
import { getFiles, getFileBySlug } from '../../lib/mdx';

export default function PostsPage({ posts }: { posts: any[] }) {
  console.log(posts[0], 'post function');
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.frontMatter.title}</Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const slugs = await getFiles('src/posts');
  const posts = await Promise.all(
    slugs.map((slug) => getFileBySlug('src/posts', slug))
  );
  console.log(posts[0], 'async function');
  return { props: { posts } };
}
