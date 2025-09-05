import BlogCard from "@/modules/blog/components/BlogCard";
import BlogFilters from "@/modules/blog/components/BlogFilters";
import { POSTS } from "@/modules/blog/data/posts";
import { filterByTag, search, sortPosts } from "@/modules/blog/lib/filter";
import ConceptCreation from "../work/ui/ConceptCreation";

export default function BlogView({ searchParams }: { searchParams?: Record<string, string> }) {
  const tag = searchParams?.tag;
  const q = searchParams?.q;
  const sort = (searchParams?.sort as "newest"|"oldest") || "newest";

  const allTags = Array.from(new Set(POSTS.flatMap(p => p.tags)));
  const filtered = sortPosts(search(filterByTag(POSTS, tag), q), sort);

  return (
    <div className="w-full relative">
      <main className="px-6 py-12 md:mt-[15vh] mt-20 max-w-7xl lg:max-w-7xl mx-auto md:max-w-full">
      <header className="mb-8">
      <div className="mx-auto max-w-2xl w-full md:text-left">
        <p className="text-[10px] uppercase text-center tracking-[0.24em]  text-zinc-400 sm:text-xs">
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

      <BlogFilters allTags={allTags} />

      {filtered.length === 0 ? (
        <p className="text-zinc-400">No posts found.</p>
      ) : (
        // <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 ">
        //   {filtered.map(p => <BlogCard key={p.slug} post={p} />)}
        // </div>
        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {filtered.map(p => <BlogCard key={p.slug} post={p} />)}
        </div>
      )}
    </main>
    <ConceptCreation/>
    </div>
  ); 
}