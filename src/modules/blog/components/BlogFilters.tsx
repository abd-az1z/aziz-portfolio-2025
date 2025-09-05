 // tags + sort
"use client";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BlogFilters({ allTags }: { allTags: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(sp.get("q") || "");
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  // Update search query when URL changes (e.g., when navigating back/forward)
  useEffect(() => {
    setSearchQuery(sp.get("q") || "");
  }, [sp]);

  const updateSearchParam = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    value ? next.set(key, value) : next.delete(key);
    router.push(`/blog?${next.toString()}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for debouncing
    timeoutRef.current = setTimeout(() => {
      updateSearchParam("q", value);
    }, 300); // 300ms delay
  };

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col space-y-5 mb-10 items-center w-full">
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
         <SearchIcon className="h-5 w-5 text-zinc-400" />
        </div>
        <input
          type="text"
          placeholder="Search posts by title or content…"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-zinc-900/50 text-sm focus:ring-2 focus:ring-purple-500/50 focus:outline-none transition-all duration-200"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              updateSearchParam("q", "");
            }}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}