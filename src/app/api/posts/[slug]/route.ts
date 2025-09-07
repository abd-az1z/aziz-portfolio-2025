import { getPostBySlug } from '@/server/db/queries';
import { toPostDetail } from '@/modules/blog/lib/mappers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  const { params } = context;
  try {
    const row = await getPostBySlug(params.slug);
    if (!row) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    const post = toPostDetail(row);
    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
