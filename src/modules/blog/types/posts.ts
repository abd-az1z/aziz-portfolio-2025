export type Post = {
    slug: string;
    title: string;
    summary: string;
    date: string;             // ISO
    readingTime: number;      // minutes
    category: string;         // e.g. "Marketing"
    cover: string;            // /images/cover.jpg
    tags: string[];           // keep for future filters
    // author: Author;
  };