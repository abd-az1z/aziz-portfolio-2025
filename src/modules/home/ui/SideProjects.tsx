import { ArrowUpRight } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { Tag, type TagVariant } from "@/components/ui/tag";

interface SideProject {
  tag: string;
  variant: TagVariant;
  name: string;
  description: string;
  stack: string[];
  github: string;
  live?: string;
}

const PROJECTS: SideProject[] = [
  {
    tag: "AGENTIC AI",
    variant: "ai",
    name: "AI Triage System",
    description:
      "AI agent that triages inbound return/refund emails into tickets, cites store policy, and safely auto-executes low-risk Stripe refunds — escalating edge cases to CSRs.",
    stack: ["Next.js", "Inngest", "Stripe", "Neon", "Drizzle", "Clerk"],
    github: "https://github.com/abd-az1z/ai-triage-system",
  },
  {
    tag: "AI TOOLING",
    variant: "ai",
    name: "PromptShrink",
    description:
      "Reduce token usage while preserving meaning. Compresses prompts intelligently to cut API costs without degrading output quality.",
    stack: ["Next.js", "OpenAI", "Anthropic SDK", "TypeScript"],
    github: "https://github.com/abd-az1z/promptshrink",
    live: "https://promptshrink.vercel.app",
  },
  {
    tag: "AI / SAAS",
    variant: "neutral",
    name: "PRChangelog",
    description:
      "AI-generated PR changelogs — connect your repo, get a polished changelog on every merge. Automates the part of shipping nobody wants to write.",
    stack: ["Next.js", "Anthropic SDK", "Firebase", "Stripe"],
    github: "https://github.com/abd-az1z/prchangelog",
    live: "https://prchangelog.vercel.app",
  },
  {
    tag: "AI / SAAS",
    variant: "neutral",
    name: "SaaScribe AI",
    description:
      "Transform PDFs into intelligent conversations — upload documents, embed them, and chat with your content using AI-powered understanding.",
    stack: ["Next.js", "LangChain", "Pinecone", "Clerk", "Neon", "Stripe"],
    github: "https://github.com/abd-az1z/SaaScribe.ai",
  },
  {
    tag: "FULL-STACK / AI",
    variant: "architecture",
    name: "CallSage",
    description:
      "AI-powered video conferencing with custom AI agents — real-time video, auth, async agent jobs, and database built end-to-end.",
    stack: ["Next.js", "Stream", "OpenAI", "BetterAuth", "Inngest", "Neon", "Drizzle"],
    github: "https://github.com/abd-az1z/callsage.com",
    live: "https://callsage-com-8m9w.vercel.app",
  },
  {
    tag: "AI INFRA",
    variant: "migration",
    name: "AICortex",
    description:
      "Reduce LLM spend by 20–40% without degrading output quality — multi-provider model routing across Anthropic, OpenAI, and Mistral.",
    stack: ["Next.js", "Anthropic SDK", "OpenAI", "Mistral", "Stripe"],
    github: "https://github.com/abd-az1z/aicortex",
    live: "https://aicortex.vercel.app",
  },
];

const SideProjects = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted-foreground">
        Side Projects
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map(({ tag, variant, name, description, stack, github, live }) => (
          <div
            key={name}
            className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-white/15"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <Tag variant={variant}>{tag}</Tag>
            </div>

            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            <p className="font-mono text-xs text-muted-foreground">
              {stack.join(" · ")}
            </p>

            <div className="flex items-center gap-4 border-t border-border pt-4">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <LuGithub className="h-4 w-4" />
                GitHub
              </a>
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SideProjects;
