import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PostDetail } from "@/modules/blog/types/posts";
import BlogIdView from "@/modules/blog/BlogIdView";

export async function getPost(slug: string): Promise<PostDetail> {
  const options: RequestInit = {
    next: { revalidate: 60 },
  };

  if (process.env.NODE_ENV === 'production') {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  const res = await fetch(`/api/posts/${slug}`, options);
  
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error('Failed to fetch post');
  }
  
  const { post } = await res.json();
  return post;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
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
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  return (
    <div className="bg-background">
      <BlogIdView post={post} />
    </div>
  );
}