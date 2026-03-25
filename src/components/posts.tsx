import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { getAllPosts, type PostSummary } from '@/server/content/posts';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface PostsProps {
  postsToShow?: number;
  className?: string;
  showAll?: boolean;
}

export default async function Posts({
  postsToShow = 5,
  className,
  showAll = false,
}: PostsProps) {
  const posts = await getAllPosts();
  const displayedPosts = showAll ? posts : posts.slice(0, postsToShow);

  return (
    <div className={cn('', className)}>
      <ul className="flex flex-col gap-4 -m-4">
        {displayedPosts.map((post: PostSummary) => (
          <li
            key={post.slug}
            className="hover:shadow-md transition-shadow relative"
          >
            <HoverCard openDelay={100} closeDelay={0}>
              <HoverCardTrigger asChild>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col lg:gap-4 lg:flex-row justify-between p-4 items-baseline"
                >
                  <h2 className="text-text/80 group-hover:text-text flex">
                    {post.frontmatter.title}
                    <ArrowRight
                      className="opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-1 transition-all duration-200"
                      size={20}
                    />
                  </h2>

                  <span className="text-text/50 uppercase font-medium tracking-wide text-sm font-mono group-hover:text-text/60 text-nowrap">
                    {formatDate(post.frontmatter.date)}
                  </span>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent
                side="left"
                sideOffset={16}
                align="center"
                alignOffset={-16}
                className="max-w-lg w-full shadow-elevate"
              >
                <Image
                  src={`/posts/${post.slug}/${post.frontmatter.featuredImage}`}
                  alt={post.frontmatter.title}
                  width={400}
                  height={200}
                  className="rounded-sm w-full h-full"
                  sizes="(max-width: 1024px) 90vw, 400px"
                />
              </HoverCardContent>
            </HoverCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
