// tag + search + sort helpers
import type { PostCard } from "@/modules/blog/types/posts";

export type SortKey = "newest" | "oldest";

export function sortPosts(posts: PostCard[], sort: SortKey = "newest"): PostCard[] {
  return [...posts].sort((a, b) =>
    sort === "newest"
      ? new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
      : new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime()
  );
}

export function filterByTag(posts: PostCard[], tag?: string): PostCard[] {
  if (!tag) return posts;
  const t = tag.toLowerCase();
  return posts.filter((post) => 
    post.tags.some((tag) => tag.toLowerCase() === t)
  );
}

export function search(posts: PostCard[], q?: string): PostCard[] {
  if (!q) return posts;
  const s = q.toLowerCase();
  return posts.filter((post) =>
    post.title.toLowerCase().includes(s) ||
    (post.summary && post.summary.toLowerCase().includes(s)) ||
    post.tags.join(" ").toLowerCase().includes(s)
  );
}