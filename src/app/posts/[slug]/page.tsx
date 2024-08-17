import Image from 'next/image';
import Link from 'next/link';
import { getPost } from '@/server/api/posts';
import ClientPostContent from '@/components/client-post-component';
import { ArrowLeft } from 'lucide-react';

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <>
      <div className="h-10 top-12 sm:sticky">
        <Link
          className="flex mt-0.5 sm:justify-center text-sm items-center gap-2 opacity-60"
          href="/posts"
        >
          <ArrowLeft size={16} className="text-element" /> /posts
        </Link>
      </div>
      <article className="defaultContainer col-span-6 sm:col-start-2">
        <h1>{post.frontmatter.title}</h1>
        {post.frontmatter.canonicalLink && (
          <p className="italic">
            Originally published at{' '}
            <Link href={post.frontmatter.canonicalLink}>
              {post.frontmatter.canonicalLink}
            </Link>
          </p>
        )}

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
    </>
  );
}
