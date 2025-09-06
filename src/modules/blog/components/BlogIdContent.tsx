// modules/blog/components/BlogIdContent.tsx
"use client";

import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import type { PostDetail } from "@/modules/blog/types/posts";

// Define the type for the code component props
interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function BlogIdContent({ post }: { post: PostDetail }) {

  const formattedDate = new Date(post.dateISO).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Debug: Log the entire post object
  console.log('Post object:', {
    ...post,
    // Truncate content for logging
    content: post.content ? `${post.content.substring(0, 100)}...` : null,
    contentLength: post.content?.length || 0
  });

  if (!post.content) {
    console.error('No content found for post:', post.slug);
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-semibold text-red-400">Error: No content found for this post</h1>
        <p className="mt-2 text-zinc-400">Please try refreshing the page or contact support if the issue persists.</p>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-zinc-100">{post.title}</h1>
      <p className="mt-2 text-sm text-zinc-400">
        {formattedDate} • {post.readingTime} min read
      </p>

      {post.cover && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image
            src={post.cover}
            alt={post.coverAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
      )}

      <div className="mt-8">
        <div className="prose prose-invert max-w-none p-6 bg-zinc-900/50 rounded-xl border border-zinc-700/50">
          <h2 className="text-2xl font-bold text-white mb-6">{post.title}</h2>
          
          {/* Main content */}
          <div className="prose-lg prose-headings:text-white prose-p:text-zinc-300 prose-strong:text-white">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeHighlight]}
              components={{
                // Customize the rendering of code blocks
                code: ({
                  node,
                  inline = false,
                  className = '',
                  children,
                  ...props
                }: CodeProps) => {
                  const match = /language-(\w+)/.exec(className || '');
                  
                  if (inline) {
                    return (
                      <code className={`${className} bg-zinc-800/50 px-1.5 py-0.5 rounded`} {...props}>
                        {children}
                      </code>
                    );
                  }
                  
                  return match ? (
                    <pre className={`${className} bg-zinc-800/80 p-4 rounded-lg overflow-x-auto`}>
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                // Add more custom components as needed
                h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
                h2: (props) => <h2 className="text-2xl font-semibold mt-8 mb-3 text-white" {...props} />,
                h3: (props) => <h3 className="text-xl font-semibold mt-6 mb-2 text-white" {...props} />,
                p: (props) => <p className="my-4 leading-relaxed text-zinc-300" {...props} />,
                a: (props) => <a className="text-blue-400 hover:text-blue-300 hover:underline" {...props} />,
                ul: (props) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                ol: (props) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
                li: (props) => <li className="text-zinc-300" {...props} />,
                blockquote: (props) => (
                  <blockquote className="border-l-4 border-zinc-600 pl-4 text-zinc-400 italic my-4" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Debug section - will be removed in production */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-zinc-800/50 rounded-lg border border-yellow-500/50">
            <h3 className="text-sm font-mono text-yellow-400 mb-2">Debug Info:</h3>
            <p className="text-sm text-yellow-300">Content length: {post.content?.length || 0} characters</p>
            <details className="mt-2">
              <summary className="text-sm text-yellow-400 cursor-pointer">View first 200 characters</summary>
              <pre className="mt-2 p-2 bg-black/50 text-xs text-yellow-200 overflow-auto max-h-40">
                {post.content?.substring(0, 200) || 'No content'}
              </pre>
            </details>
          </div>
        )} */}
      </div>

      {/* <hr className="my-8 border-white/10" /> */}
    </article>
  );
}