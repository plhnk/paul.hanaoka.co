import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, getPost } from '@/server/api/posts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    if (slug) {
      const post = await getPost(slug);
      return NextResponse.json(post);
    } else {
      const posts = await getAllPosts();
      return NextResponse.json(posts);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}