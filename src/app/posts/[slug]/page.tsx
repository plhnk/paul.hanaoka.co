import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getPost } from '@/server/content/posts';
import ClientPostContent from '@/components/client-post-component';
import { formatDate } from '@/lib/utils';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <>
      <article className="defaultContainer col-span-5 lg:col-start-3">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-2 ">
          <span className="text-text/50 uppercase font-medium tracking-wide text-sm font-mono group-hover:text-text/60">
            {formatDate(post.frontmatter.date)}
          </span>
          <div className="-order-1 -ml-3 mb-4 -mt-8 md:m-0 md:order-none flex">
            {post.frontmatter.tags?.map((tag) => (
              <div
                key={tag}
                className="rounded-full text-nowrap mr-2 sm:mr-0 sm:mb-2 px-3 py-1 bg-card text-element text-sm outline outline-background/80 -outline-offset-1 outline-1"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
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
            src={`/posts/${slug}/${post.frontmatter.featuredImage}`}
            alt={post.frontmatter.title}
            width={800}
            height={400}
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        )}
        <ClientPostContent content={post.content} />
      </article>
    </>
  );
}
