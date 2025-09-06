import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogIdView from "@/modules/blog/BlogIdView";
import { getPostBySlug } from "@/server/db/queries";
import type { PostRow } from "@/modules/blog/types/posts";
import { toPostDetail } from "@/modules/blog/lib/mappers";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const slug = await Promise.resolve(params.slug);
  
  const row = (await getPostBySlug(slug)) as PostRow | null;
  if (!row) return {};

  const post = toPostDetail(row);
  return {
    title: `${post.title} | Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.cover ? [{ url: post.cover }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  
  const row = (await getPostBySlug(slug)) as PostRow | null;
  if (!row) notFound();

  const post = toPostDetail(row);

  return (
    <div className="bg-background">
      <BlogIdView post={post} />
    </div>
  );
}