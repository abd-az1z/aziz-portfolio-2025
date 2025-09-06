// modules/blog/BlogIdView.tsx
"use client";

import BlogIdContent from "./components/BlogIdContent";
import type { PostDetail } from "@/modules/blog/types/posts";

export default function BlogIdView({ post }: { post: PostDetail }) {
  return (
    <div className="w-full mt-20 relative">
      <BlogIdContent post={post} />
    </div>
  );
}