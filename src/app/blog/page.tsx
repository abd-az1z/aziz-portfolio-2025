import { Suspense } from 'react';
import BlogView from "@/modules/blog/BlogView"
import { BlogViewSkeleton } from "@/modules/blog/components/BlogViewSkeleton";

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<BlogViewSkeleton />}>
      <BlogView />
    </Suspense>
  );
}