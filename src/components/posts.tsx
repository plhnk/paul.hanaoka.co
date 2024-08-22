'use client';
import { cn } from '@/lib/utils';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface Frontmatter {
  author: string;
  date: string;
  title: string;
  canonicalLink?: string;
  draft: boolean;
  tags?: string[];
  description?: string;
  lastModified?: string;
  category?: string;
  featuredImage?: string;
}

interface Post {
  slug: string;
  frontmatter: Frontmatter;
}

interface PostsProps {
  postsToShow?: number;
  filter?: boolean;
  className?: string;
  showAll?: boolean; // New prop to show all posts
}

function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date(0) : date;
}

export default function Posts({
  postsToShow = 5,
  filter = false,
  className,
  showAll = false,
}: PostsProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((fetchedPosts) => {
        setPosts(
          fetchedPosts.sort(
            (a: Post, b: Post) =>
              parseDate(b.frontmatter.date).getTime() -
              parseDate(a.frontmatter.date).getTime()
          )
        );
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) => {
      post.frontmatter.tags?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.frontmatter.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  const displayedPosts = showAll
    ? filteredPosts
    : filteredPosts.slice(0, postsToShow);

  return (
    <div className={cn('', className)}>
      {filter && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <Button
              key={tag}
              className="rounded-full gap-2 text-nowrap mr-2 sm:mr-0 sm:mb-2 px-4 py-1 bg-card text-element text-sm outline outline-background/80 -outline-offset-1 outline-1"
              // variant={selectedTag === tag ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag} <span>{count}</span>
            </Button>
          ))}
        </div>
      )}

      <ul className="flex flex-col gap-4 -m-4">
        {displayedPosts.map((post) => (
          <li
            key={post.slug}
            className="hover:shadow-md transition-shadow relative"
          >
            <HoverCard openDelay={100} closeDelay={0}>
              <HoverCardTrigger>
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
                />
              </HoverCardContent>
            </HoverCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
