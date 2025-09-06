// seed/posts-aug-2025.ts
// Type hint (optional): type NewPost = typeof posts.$inferInsert;

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
//   {
//     slug: "promptless-uis-designing-ai-that-feels-native",
//     title: "Promptless UIs: Designing AI That Feels Native",
//     description:
//       "Great AI products hide prompts behind affordances. Learn patterns for suggestions, inline actions, semantic search over help content, and when to reveal advanced controls for power users.",
//     createdAt: "2025-08-14T21:02:00.000Z",
//     coverUrl:
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
//     coverAlt: "Minimalistic UI mockups on a desk",
//     tags: ["Product", "UX", "AI Design", "Prompt Engineering"]
//   },
//   {
//     slug: "evaluation-that-matters-building-an-ai-quality-loop",
//     title: "Evaluation That Matters: Building an AI Quality Loop",
//     description:
//       "Offline evals are table stakes. We show how to combine golden sets, synthetic edge cases, online metrics, and human review queues to close the loop. Includes a lightweight schema for tracing and error taxonomy.",
//     createdAt: "2025-08-17T12:30:00.000Z",
//     coverUrl:
//       "https://images.unsplash.com/photo-1551281044-8d8e88b50f2b?auto=format&fit=crop&w=1400&q=80",
//     coverAlt: "Dashboard with charts and analytics",
//     tags: ["Evaluation", "Observability", "LLMOps", "Telemetry"]
//   },
//   {
//     slug: "cost-down-quality-up-inference-optimization-playbook",
//     title: "Cost Down, Quality Up: The 2025 Inference Optimization Playbook",
//     description:
//       "Token budgeting, early-exit decoders, speculative decoding, and caching can cut costs by 40–70%. We share a pragmatic checklist and a few traps that inflate your bill without improving UX.",
//     createdAt: "2025-08-20T08:55:00.000Z",
//     coverUrl:
//       "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
//     coverAlt: "Calculator and financial charts on a workspace",
//     tags: ["Scaling", "Performance", "Inference", "Cost Optimization"]
//   },
//   {
//     slug: "secure-by-default-guardrails-and-compliance-for-ai",
//     title: "Secure by Default: Guardrails & Compliance for AI",
//     description:
//       "From prompt injection and data exfiltration to PII redaction and role-based tools, here’s a secure-by-default posture for AI systems. Includes a minimal threat model template you can adapt to your org.",
//     createdAt: "2025-08-22T19:15:00.000Z",
//     coverUrl:
//       "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1400&q=80",
//     coverAlt: "Lock icon on a screen representing cybersecurity",
//     tags: ["Security", "Compliance", "Guardrails", "PII"]
//   },
//   {
//     slug: "multimodal-in-production-vision-audio-and-docs",
//     title: "Multimodal in Production: Vision, Audio, and Docs",
//     description:
//       "Real-world pipelines for OCR + layout, screenshot QA, meeting notes with diarization, and image-grounded chat. We share a reference stack and tips for keeping latency predictable under load.",
//     createdAt: "2025-08-24T14:18:00.000Z",
//     coverUrl:
//       "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
//     coverAlt: "Collage of camera, microphone, and documents",
//     tags: ["Multimodal", "Vision", "Audio", "Docs", "Production"]
//   },
//   {
//     slug: "from-pocs-to-products-hardening-your-ai-stack",
//     title: "From POCs to Products: Hardening Your AI Stack",
//     description:
//       "What changes when you go from a weekend demo to 10k DAU? We cover schema design, audit logs, feature flags for models/tools, and data retention policies that keep you compliant and sane.",
//     createdAt: "2025-08-27T07:48:00.000Z",
//     coverUrl:
//       "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1400&q=80",
//     coverAlt: "Server racks with blue LEDs",
//     tags: ["Architecture", "Prod Readiness", "SRE", "Compliance"]
//   },
//   {
//     slug: "human-feedback-2025-synthetic-vs-real-tradeoffs",
//     title: "Human Feedback in 2025: Synthetic vs. Real Trade-offs",
//     description:
//       "Synthetic labels speed iteration; human feedback grounds quality. We outline when to use which, how to price review time, and ways to prevent label leakage into eval sets.",
//     createdAt: "2025-08-29T16:22:00.000Z",
//     coverUrl:
//       "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80",
//     coverAlt: "Team collaborating with sticky notes on a wall",
//     tags: ["RLHF", "Data", "Quality", "Evaluation"]
//   },
//   {
//     slug: "shipping-ai-assistants-in-b2b-from-pilot-to-rollout",
//     title: "Shipping AI Assistants in B2B: From Pilot to Rollout",
//     description:
//       "Lessons from rolling out AI assistants to customer-facing teams: consent flows, measurable value, fallback paths, and playbooks for change management so adoption sticks.",
//     createdAt: "2025-08-31T11:10:00.000Z",
//     coverUrl:
//       "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80",
//     coverAlt: "Business meeting with laptops and documents",
//     tags: ["B2B", "Assistants", "Go-to-Market", "Change Management"]
//   }
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