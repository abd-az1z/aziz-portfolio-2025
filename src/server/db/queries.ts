import { db } from "./client";
import { posts } from "./schema";
import { desc, ilike, or } from "drizzle-orm";

export async function getPosts(q?: string) {
  const where = q
    ? or(
        ilike(posts.title, `%${q}%`),
        ilike(posts.description, `%${q}%`)
      )
    : undefined;

  return db
    .select()
    .from(posts)
    .where(where)
    .orderBy(desc(posts.createdAt));
}

export async function getPostBySlug(slug: string) {
  const rows = await db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      description: posts.description,
      content: posts.content,
      createdAt: posts.createdAt,
      coverUrl: posts.coverUrl,
      coverAlt: posts.coverAlt,
      tags: posts.tags
    })
    .from(posts)
    .where(ilike(posts.slug, slug));
    
  const post = rows[0] ?? null;
  
  if (post) {
    console.log(`Fetched post '${post.title}' with content length: ${post.content?.length || 0}`);
  } else {
    console.log(`No post found with slug: ${slug}`);
  }
  
  return post;
}