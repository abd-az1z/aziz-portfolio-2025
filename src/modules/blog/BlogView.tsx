'use client';

import { useSearchParams } from 'next/navigation';
import BlogCard from "@/modules/blog/components/BlogCard";
import BlogFilters from "@/modules/blog/components/BlogFilters";
import { filterByTag, search, sortPosts } from "@/modules/blog/lib/filter";
import { getPosts } from "@/server/db/queries";
import { toPostCard } from "@/modules/blog/lib/mappers";
import type { PostCard } from "@/modules/blog/types/posts";
import { useEffect, useState } from 'react';

export default function BlogView() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const tag = searchParams?.get('tag') || undefined;
  const q = searchParams?.get('q') || '';
  const sort = (searchParams?.get('sort') as 'newest' | 'oldest') || 'newest';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const rows = await getPosts(q);
        const cards: PostCard[] = rows.map(toPostCard);
        setPosts(cards);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [q]);

  if (isLoading) {
    return null; // The Suspense fallback will handle the loading state
  }
  
  const filtered = sortPosts(search(filterByTag(posts, tag), q), sort);

  return (
    <div className="w-full relative">
      <main className="px-6 py-12 max-w-7xl lg:max-w-7xl mx-auto md:max-w-full mt-20">
        <header className="mb-8">
          <div className="mx-auto max-w-2xl w-full md:text-left">
            <p className="text-[10px] uppercase text-center tracking-[0.24em] text-zinc-400 sm:text-xs">
              the blog
            </p>
            <h1
              id="know-about-me"
              className="mt-3 text-center font-['NyghtSerif-Light'] text-zinc-100 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[56px]"
            >
              The handpicked insights <br /> from the{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 px-1 font-semibold tracking-wide bg-clip-text text-transparent font-['NyghtSerif']">
                pensieve
              </span>
            </h1>
          </div>
        </header>

        <BlogFilters />

        {filtered.length === 0 ? (
          <p className="text-zinc-400">No posts found.</p>
        ) : (
          <div className="flex flex-col gap-16 max-w-4xl mx-auto">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
