
"use client";

import Link from "next/link";
import Image from "next/image";
import TagPill from "@/modules/blog/ui/TagPill";
import { formatDate } from "../lib/format";
import type { PostCard } from "@/modules/blog/types/posts";

export default function BlogCard({ post }: { post: PostCard }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block rounded-2xl">
      <div className="flex items-center gap-5">
        <div className="w-64 h-60 overflow-hidden rounded-2xl">
          <Image
            src={post.cover}
            alt={post.coverAlt || post.title}
            className="object-cover w-full h-full"
            width={600}
            height={600}
            priority={false}
          />
        </div>

        <div className="flex-1 h-60 flex flex-col justify-between px-6 py-4 rounded-2xl">
          <span className="text-xs text-zinc-500">
            {formatDate(post.dateISO)}
          </span>

          <h3 className="text-lg mt-3 font-semibold group-hover:underline">
            {post.title}
          </h3>

          <p className="text-sm text-zinc-400 line-clamp-3">{post.summary}</p>

          <div className="mt-6 border-t pt-3 border-white/20 flex items-center justify-between">
            {post.readingTime && post.readingTime > 1 ? (
              <span className="text-xs text-zinc-400">
                {post.readingTime} min read
              </span>
            ) : null}

            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.map((t) => (
                <TagPill key={t} label={t} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
