export const postsData = [
  {
    slug: "on-device-agents-are-here-privacy-first-ai-on-your-phone",
    title: "On-Device Agents Are Here: Privacy-First AI on Your Phone",
    description:
      "With efficient transformer variants and NPU acceleration, on-device agents finally feel instant. This post breaks down what work belongs on the edge vs. in the cloud, how to cache tool outputs, and a minimal architecture for hybrid inference in production.",
    content: `# On-Device Agents: Privacy-First AI on Your Phone

With the rise of powerful mobile processors and specialized neural processing units (NPUs), on-device AI agents have become a reality. This article explores the technical challenges and solutions for running AI models directly on mobile devices.

## The Promise of On-Device AI

- **Reduced Latency**: No network round trips mean faster response times
- **Enhanced Privacy**: Sensitive data never leaves the device
- **Offline Capabilities**: Functionality without internet connectivity

## Technical Implementation

We'll dive into the architecture of our on-device agent, including model optimization techniques like quantization and pruning to ensure smooth performance on mobile hardware.

## Future Directions

As hardware continues to improve, we expect to see even more sophisticated AI capabilities running directly on devices, opening up new possibilities for privacy-preserving applications.`,
    createdAt: "2025-08-02T10:24:00.000Z",
    coverUrl:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80",
    coverAlt: "Close-up of a smartphone chip and circuitry",
    tags: ["AI", "Edge AI", "Privacy", "Mobile", "Agents"]
  },
  {
    slug: "rag-in-2025-architectures-that-actually-scale",
    title: "RAG in 2025: Architectures That Actually Scale",
    description:
      "Everyone implements RAG; not everyone ships low-latency, high-recall search. We compare multi-vector stores, hybrid sparse+dense retrieval, chunking that preserves discourse, query planning with toolformer prompts, and guardrails that reduce hallucinations.",
    content: `# RAG in 2025: Architectures That Actually Scale

Retrieval-Augmented Generation (RAG) has evolved significantly since its inception. In this post, we explore the latest architectures that deliver production-grade performance.

## Key Components

- **Multi-Vector Stores**: Leveraging specialized indices for different data types
- **Hybrid Search**: Combining sparse and dense retrieval methods
- **Query Planning**: Dynamic routing for complex information needs

## Implementation Tips

We'll walk through a reference architecture that balances latency and recall, with practical examples in Python and TypeScript.`,
    createdAt: "2025-08-05T18:05:00.000Z",
    coverUrl:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1400&q=80",
    coverAlt: "Abstract visualization of data nodes and connections",
    tags: ["RAG", "LLM", "Vector DB", "Search", "Scaling"]
  },
  {
    slug: "shipping-ai-features-with-nextjs-15-and-server-actions",
    title: "Shipping AI Features with Next.js 15 and Server Actions",
    content: `# Shipping AI Features with Next.js 15 and Server Actions

Next.js 15 introduces powerful new features for building AI applications. In this post, we'll explore how to leverage Server Actions for AI feature integration.

## Key Features

- **Streaming Responses**: Deliver AI-generated content as it's being generated
- **Edge Functions**: Run AI models at the edge for reduced latency
- **Type Safety**: End-to-end type safety with TypeScript

## Getting Started

We'll walk through building a simple AI-powered feature using Next.js 15's new capabilities.`,
    description:
      "A practical guide to wiring streaming generations, structured outputs, and background jobs using Server Actions + edge runtime. Includes patterns for tool use, retries, and tracing—plus what to put in server vs. client for snappy UX.",
    createdAt: "2025-08-08T15:12:00.000Z",
    coverUrl:
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1400&q=80",
    coverAlt: "Laptop with code editor in dark theme",
    tags: ["Next.js", "Full-Stack", "AI UX", "Server Actions", "Streaming"]
  },
  {
    slug: "autonomous-workflows-from-prompts-to-processes",
    title: "Autonomous Workflows: From Prompts to Processes",
    description:
      "Move beyond single-shot prompts. We outline a state-machine approach for multi-step AI workflows, scheduling with idempotency keys, human-in-the-loop checkpoints, and safe tool permissions for production agents.",
    content: `# Autonomous Workflows: From Prompts to Processes

Autonomous workflows are the future of AI application development. In this post, we'll explore how to build workflows that can handle complex tasks.

## Key Components

- **State Machines**: Managing workflow state
- **Scheduling**: Handling idempotency keys
- **Human-in-the-Loop**: Adding checkpoints for human review

## Implementation Guide

We'll provide a step-by-step guide to implementing autonomous workflows in your AI applications.

## Getting Started

We'll walk through building a simple AI-powered feature using Next.js 15's new capabilities.`,
    createdAt: "2025-08-11T09:40:00.000Z",
    coverUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    coverAlt: "Robotic arm assembling components on a line",
    tags: ["Agents", "Workflow", "Orchestration", "DevOps", "Safety"]
  },
] satisfies Array<{
  slug: string;
  title: string;
  description: string;
  content: string;
  createdAt: string;
  coverUrl: string;
  coverAlt: string;
  tags: string[];
}>;