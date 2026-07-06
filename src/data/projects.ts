export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags?: string[];
  points?: string[];
  video?: string;
  link?: string;
  github?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "ai-triage",
    title: "AI Triage System",
    blurb:
      "AI agent that triages inbound return/refund emails into tickets, cites store policy, and safely auto-executes low-risk Stripe refunds - escalating edge cases to CSRs.",
    points: [
      "Agentic workflow: email → ticket classification → policy citation",
      "Fail-safe design: auto-executes only low-risk refunds via Stripe",
      "Escalates edge cases to human CSRs automatically",
      "Async job processing with Inngest for reliability",
      "Neon + Drizzle ORM for type-safe ticket storage",
      "Auth and access control with Clerk",
    ],
    tags: ["Next.js", "TypeScript", "Inngest", "Stripe", "Neon", "Drizzle", "Clerk"],
    github: "https://github.com/abd-az1z/ai-triage-system",
    link: "https://ai-triage-system-ashen.vercel.app",
  },
  {
    id: "promptshrink",
    title: "PromptShrink",
    blurb:
      "Reduce token usage while preserving meaning. Compresses prompts intelligently to cut API costs without degrading output quality.",
    points: [
      "Lossless compression preserving prompt meaning and structure",
      "Privacy-first: no data storage or logging",
      "Real-time token count estimation and savings display",
      "Supports Anthropic and OpenAI prompt formats",
      "Lightning-fast optimization with minimal latency",
    ],
    tags: ["Next.js", "OpenAI", "Anthropic SDK", "TypeScript"],
    github: "https://github.com/abd-az1z/promptshrink",
    link: "https://promptshrink.vercel.app",
    video: "/videos/PromptShrink.mov",
  },
  {
    id: "prchangelog",
    title: "PRChangelog",
    blurb:
      "AI-generated PR changelogs - connect your repo, get a polished changelog on every merge. Automates the part of shipping nobody wants to write.",
    points: [
      "Connects to GitHub repos via webhook or manual trigger",
      "Anthropic SDK generates structured, human-readable changelogs",
      "Firebase for real-time storage and changelog history",
      "Stripe billing for team and pro tier access",
      "Clean dashboard to view, edit, and export changelogs",
    ],
    tags: ["Next.js", "Anthropic SDK", "Firebase", "Stripe", "TypeScript"],
    github: "https://github.com/abd-az1z/prchangelog",
    link: "https://prchangelog.vercel.app",
  },
  {
    id: "saascribe",
    title: "SaaScribe AI",
    blurb:
      "Transform PDFs into intelligent conversations - upload documents, embed them, and chat with your content using AI-powered understanding.",
    points: [
      "PDF ingestion with text extraction and chunking",
      "LangChain + Pinecone for vector storage and similarity search",
      "Clerk for auth and session management",
      "Neon + serverless Postgres for document metadata",
      "Stripe billing for pro tier access",
    ],
    tags: ["Next.js", "LangChain", "Pinecone", "Clerk", "Neon", "Stripe", "TypeScript"],
    github: "https://github.com/abd-az1z/SaaScribe.ai",
    link: "https://saascribeai.vercel.app",
  },
  {
    id: "callsage",
    title: "CallSage",
    blurb:
      "AI-powered video conferencing with custom AI agents - real-time video, auth, async agent jobs, and database built end-to-end.",
    points: [
      "Stream for high-quality, real-time video calls",
      "OpenAI for intelligent, context-aware meeting participation",
      "Searchable transcripts & AI chat for instant context",
      "Secure auth with BetterAuth, background jobs via Inngest",
      "Neon + Drizzle ORM for type-safe database operations",
    ],
    tags: ["Next.js", "Stream", "OpenAI", "BetterAuth", "Inngest", "Neon", "Drizzle"],
    github: "https://github.com/abd-az1z/callsage.com",
    link: "https://callsage-com-8m9w.vercel.app",
    video: "/videos/CallSage.MP4",
  },
  {
    id: "aicortex",
    title: "AICortex",
    blurb:
      "Reduce LLM spend by 20–40% without degrading output quality - intelligent multi-provider model routing across Anthropic, OpenAI, and Mistral.",
    points: [
      "Routes requests to the cheapest model capable of the task",
      "Supports Anthropic, OpenAI, and Mistral out of the box",
      "Stripe billing for usage-based pricing",
      "Real-time cost tracking and savings dashboard",
      "Drop-in API - swap in AICortex without changing your prompts",
    ],
    tags: ["Next.js", "Anthropic SDK", "OpenAI", "Mistral", "Stripe", "TypeScript"],
    github: "https://github.com/abd-az1z/aicortex",
    link: "https://aicortex.vercel.app",
  },
  {
    id: "solvebot",
    title: "SolveBot",
    blurb:
      "AI-powered customer support chatbot with WCAG accessibility built-in - GraphQL API layer, Postgres backend, persona-driven responses.",
    points: [
      "GPT-3.5 for real-time persona-driven responses",
      "GraphQL (Apollo) + PostgreSQL (Hasura) backend",
      "Role-based dashboards & session tracking",
      "WCAG accessibility & cross-browser performance",
      "Frontend with reusable ShadCN + Tailwind components",
    ],
    tags: ["Next.js", "GraphQL", "Apollo", "OpenAI", "PostgreSQL", "Hasura", "Clerk"],
    github: "https://github.com/abd-az1z/SolveBot",
    video: "/videos/solvebot.MP4",
  },
];
