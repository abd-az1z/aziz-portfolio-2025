"use client";
import Link from "next/link";
import { Post } from "../types/posts";
import { formatDate } from "../lib/format";
import TagPill from "@/modules/blog/ui/TagPill";
import Image from "next/image";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl"
    >
     
     <div className="flex items-center gap-5">
     <div className="w-64 h-60 overflow-hidden rounded-2xl">
        <Image src={post.cover} alt={post.title} className="object-cover" width={600} height={600} /> 
        </div>
       <div className="flex-1 h-60 flex flex-col item justify-between px-6 py-4 rounded-2xl">
          <span className="text-xs text-zinc-500">{formatDate(post.date)}</span>
          <h3 className="text-lg mt-3 font-semibold group-hover:underline">{post.title}</h3>
          <p className="text-sm text-zinc-400">{post.summary}</p>
        <div className="mt-6 border-t pt-3 border-white/20 flex items-center justify-between">
          {post.readingTime > 1 ? (
            <span className="text-xs text-zinc-400">{post.readingTime} min read</span>
          ) : null}
          <div className="flex items-center gap-2">
            {post.tags.map(t => <TagPill key={t} label={t} />)}
          </div>
        </div>
       </div>
     </div>
     
    </Link>
  );
}