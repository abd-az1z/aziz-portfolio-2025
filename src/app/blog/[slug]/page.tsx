import { notFound } from 'next/navigation';
import { POSTS } from "@/modules/blog/data/posts";
import BlogIdView from "@/modules/blog/ui/BlogIdView";
import type { Metadata } from 'next';

const getPostBySlug = (slug: string) => {
  return POSTS.find((post) => post.slug === slug);
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Blog`,
    description: post.summary,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className='bg-background'>
      <BlogIdView post={post} />
    </div>
  );
}