import Image from 'next/image';
import { getPost } from '@/server/api/posts';
import ClientPostContent from '@/components/client-post-component';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article className='defaultContainer'>
      <h1>{post.frontmatter.title}</h1>
      <p>By {post.frontmatter.author} on {post.frontmatter.date}</p>
      {post.frontmatter.featuredImage && (
        <Image
          src={`/posts/${params.slug}/${post.frontmatter.featuredImage}`}
          alt={post.frontmatter.title}
          width={800}
          height={400}
        />
      )}
      <ClientPostContent content={post.content} />
    </article>
  );
}