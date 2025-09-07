import { getPosts } from '@/server/db/queries';
import { toPostCard } from '@/modules/blog/lib/mappers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const rows = await getPosts();
    const posts = rows.map(toPostCard);
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
