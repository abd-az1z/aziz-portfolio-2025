// modules/blog/mappers.ts
import type { PostRow, PostCard, PostDetail } from "@/modules/blog/types/posts";

export function toPostCard(row: PostRow): PostCard {
  const readingTime = Math.max(1, Math.round(row.description.length / 800));
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.description,
    dateISO: row.createdAt.toISOString(),
    cover: row.coverUrl,
    coverAlt: row.coverAlt,
    tags: row.tags ?? [],
    readingTime,
  };
}

export function toPostDetail(row: PostRow): PostDetail {
  // Debug: Log the incoming row data
  console.log('Mapping row to PostDetail:', {
    id: row.id,
    slug: row.slug,
    hasContent: !!row.content,
    contentLength: row.content?.length || 0
  });

  const content = row.content || row.description;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200)); // ~200 wpm

  const result = {
    slug: row.slug,
    title: row.title,
    summary: row.description,
    content: content,
    dateISO: row.createdAt.toISOString(),
    readingTime,
    cover: row.coverUrl,
    coverAlt: row.coverAlt,
    tags: row.tags ?? [],
    category: "Technology",
  };

  // Debug: Verify the result
  console.log('Mapped PostDetail:', {
    title: result.title,
    contentLength: result.content.length,
    hasContent: !!result.content
  });

  return result;
}