// modules/blog/types.ts

// 1) Raw DB row (Drizzle)
export type PostRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  coverUrl: string;
  coverAlt: string | null;
  tags: string[];
};

// 2) UI card (list view)
export type PostCard = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  dateISO: string;
  cover: string;
  coverAlt: string | null;
  tags: string[];
  readingTime?: number;
};

// 3) UI detail (single post page)
export type PostDetail = {
  slug: string;
  title: string;
  summary: string;
  dateISO: string;
  readingTime: number;
  cover: string;
  coverAlt: string | null;
  tags: string[];
  category: string;
  content: string; // Markdown content of the post
};