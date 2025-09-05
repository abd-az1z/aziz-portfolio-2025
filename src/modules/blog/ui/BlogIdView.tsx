"use client";

import Image from "next/image";
import type { Post } from "@/modules/blog/types/posts";

export default function BlogIdView({ post }: { post: Post }) {
  return (
    <article className="mx-auto md:mt-[15vh] max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-zinc-100">{post.title}</h1>
      <p className="mt-2 text-sm text-zinc-400">
        {new Date(post.date).toLocaleDateString()} • {post.readingTime} min read
      </p>

      {post.cover && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src={post.cover} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <div className="prose prose-invert mt-8">
        <p>Replace with MDX content later. For now this renders the full post layout.</p>
      </div>

      {/* author footer (optional) */}
      <hr className="my-8 border-white/10" />
      <div className="flex items-center gap-3">
        {/* {post.author?.avatar && (
          <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/10">
            <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
          </div>
        )} */}
        <div className="leading-tight">
          {/* <div className="font-medium text-zinc-100">{post.author?.name}</div> */}
          {/* <div className="text-sm text-zinc-400">{post.author?.role}</div> */}
        </div>
      </div>
    </article>
  );
}