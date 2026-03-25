import { describe, expect, it } from 'vitest';
import { getAllPosts, parseFrontmatter } from '@/server/content/posts';

describe('posts content helpers', () => {
  it('parses frontmatter fields and tags', () => {
    const { data, content } = parseFrontmatter(`---
title: Test Title
date: 2024-01-01
draft: false
tags: [design, code]
featuredImage: hero.png
---
Hello world`);

    expect(data.title).toBe('Test Title');
    expect(data.date).toBe('2024-01-01');
    expect(data.draft).toBe(false);
    expect(data.tags).toEqual(['design', 'code']);
    expect(data.featuredImage).toBe('hero.png');
    expect(content.trim()).toBe('Hello world');
  });

  it('returns posts sorted from newest to oldest', async () => {
    const posts = await getAllPosts();

    expect(posts.length).toBeGreaterThan(0);

    const timestamps = posts.map((post) =>
      new Date(post.frontmatter.date).getTime()
    );
    const sortedTimestamps = [...timestamps].sort((a, b) => b - a);

    expect(timestamps).toEqual(sortedTimestamps);
  });
});
