// tag + search + sort helpers
import { Post } from "../types/posts";

export type SortKey = "newest" | "oldest";
export function sortPosts(posts: Post[], sort: SortKey = "newest") {
  return [...posts].sort((a,b) =>
    sort === "newest"
      ? +new Date(b.date) - +new Date(a.date)
      : +new Date(a.date) - +new Date(b.date)
  );
}

export function filterByTag(posts: Post[], tag?: string) {
  if (!tag) return posts;
  const t = tag.toLowerCase();
  return posts.filter(p => p.tags.some(x => x.toLowerCase() === t));
}

export function search(posts: Post[], q?: string) {
  if (!q) return posts;
  const s = q.toLowerCase();
  return posts.filter(p =>
    p.title.toLowerCase().includes(s) ||
    p.summary.toLowerCase().includes(s) ||
    p.tags.join(" ").toLowerCase().includes(s)
  );
}