'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Frontmatter {
  author: string;
  date: string;
  title: string;
  canonicalLink?: string;
  draft: boolean;
  tags?: string[]; // Make tags optional
  description?: string;
  lastModified?: string;
  category?: string;
}

interface Post {
  slug: string;
  frontmatter: Frontmatter;
}

interface PostsProps {
  postsToShow?: number;
  filter?: boolean;
}

function parseDate(dateString: string): Date {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date(0) : date;
}

export default function Posts({ postsToShow = 5, filter = false }: PostsProps) {
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

  const displayedPosts = filteredPosts.slice(0, postsToShow);

  return (
    <div>
      {filter && (
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag} ({count})
            </Button>
          ))}
        </div>
      )}

      <ul className="flex flex-col gap-4 -m-4">
        {displayedPosts.map((post) => (
          <li
            key={post.slug}
            className="hover:shadow-md transition-shadow "
          >
            <Link
              href={`/posts/${post.slug}`}
              className="group flex justify-between p-4"
            >
              <h2 className="text-text/80 group-hover:text-text flex">
                {post.frontmatter.title}
                <ArrowRight
                  className="ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200"
                  size={20}
                />
              </h2>

              <span className="text-text/50 group-hover:text-text/60">{post.frontmatter.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
