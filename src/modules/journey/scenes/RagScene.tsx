"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SceneSection from "../components/SceneSection";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 4 — the leap: AI/RAG.
 * Phase 4 adds the `scene-rag` point-lattice clip + HUD-style stat reveals.
 */
const PIPELINE = ["PDF ingestion", "chunk embedding", "similarity search", "graceful fallback"];

const RagScene = () => {
  return (
    <SceneSection id="scene-rag" kicker="Feb 2026 · Chapter 3">
      <div className="space-y-8">
        <Tag variant="ai">AI/RAG</Tag>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          The restaurant bot couldn&apos;t answer from real menus.{" "}
          <span className="text-muted-foreground">
            So I built the RAG pipeline that let it — end to end, from scratch.
          </span>
        </h2>

        {/* Pipeline flow — animates as connected stages in Phase 4 */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-foreground md:text-base">
          {PIPELINE.map((stage, i) => (
            <span key={stage} className="flex items-center gap-3">
              <span className="rounded-md border border-tag-ai/30 bg-tag-ai/10 px-3 py-1.5 text-tag-ai">
                {stage}
              </span>
              {i < PIPELINE.length - 1 && (
                <span className="text-muted-foreground">→</span>
              )}
            </span>
          ))}
        </div>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          pgvector similarity search at chat time — 12 chunks, 0.25 threshold —
          with graceful fallback to raw text if pgvector is unavailable.
          Deployed and verified before a live client visit.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <p className="font-mono text-sm text-muted-foreground">
            Python · Flask · pgvector · PostgreSQL · OpenAI
          </p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            View Case Study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </SceneSection>
  );
};

export default RagScene;
