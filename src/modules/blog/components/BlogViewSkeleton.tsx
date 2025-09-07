import { Skeleton } from "@/components/ui/skeleton";

export function BlogViewSkeleton() {
  return (
    <div className="w-full relative">
      <main className="px-6 py-12 max-w-7xl lg:max-w-7xl mx-auto md:max-w-full mt-20">
        <header className="mb-8">
          <div className="mx-auto max-w-2xl w-full md:text-left">
            <Skeleton className="h-4 w-32 mx-auto bg-zinc-800" />
            <Skeleton className="h-12 w-full max-w-md mx-auto mt-3 bg-zinc-800" />
          </div>
        </header>

        {/* Filters Skeleton */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 bg-zinc-800" />
          ))}
        </div>

        {/* Blog Posts Skeleton */}
        <div className="flex flex-col gap-16 max-w-4xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-48 bg-zinc-800" />
              <Skeleton className="h-8 w-full max-w-2xl bg-zinc-800" />
              <Skeleton className="h-4 w-3/4 bg-zinc-800" />
              <Skeleton className="h-4 w-1/2 bg-zinc-800" />
              <Skeleton className="h-4 w-64 bg-zinc-800 mt-4" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
