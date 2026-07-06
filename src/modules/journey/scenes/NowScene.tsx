"use client";

import SceneSection from "../components/SceneSection";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 7 — now.
 * Phase 5 adds the ambient `scene-now` clip behind this.
 */
const NowScene = () => {
  return (
    <SceneSection id="scene-now" video kicker="Jul 2026 · Now">
      <div className="space-y-8">
        <Tag variant="ai">AI/RAG</Tag>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Voice bots with mid-call human handoff. LangGraph multi-agent
          workflows. LiteLLM.{" "}
          <span className="text-muted-foreground">50+ PRs in. Still shipping.</span>
        </h2>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tag-initiative opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tag-initiative" />
          </span>
          <span className="font-mono text-xs font-medium tracking-wide text-tag-initiative">
            [OPEN TO FULL-TIME ROLES]
          </span>
        </div>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          From security fixes to architecture decisions in 8 months. The next
          chapter is a full-time role at an AI startup or mid-stage SaaS
          company — backend, full-stack, or AI infrastructure.
        </p>
      </div>
    </SceneSection>
  );
};

export default NowScene;
