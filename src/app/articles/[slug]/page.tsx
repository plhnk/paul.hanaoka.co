import Image from 'next/image';
import { getPost } from '@/server/api/posts';
import ClientPostContent from '@/components/client-post-component';

interface Frontmatter {
  [key: string]: string;
}

interface PostData {
  slug: string;
  frontmatter: Frontmatter;
  content: any; // Change this to 'any' as MDXRemoteSerializeResult is not serializable
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post: PostData = await getPost(params.slug);

  console.log('BlogPost fetched data', post);

  return (
    <article>
      <h1>{post.frontmatter.title}</h1>
      <p>By {post.frontmatter.author} on {post.frontmatter.date}</p>
      {post.frontmatter.featuredImage && (
        <Image
          src={post.frontmatter.featuredImage}
          alt={post.frontmatter.title}
          width={800}
          height={400}
        />
      )}
      <ClientPostContent content={post.content} />
    </article>
  );
}