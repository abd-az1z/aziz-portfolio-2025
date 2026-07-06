"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SceneSection from "../components/SceneSection";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 3 — the unlock: architecture.
 * Phase 4 pins this scene and scrubs the 6,200 → 109 countdown against the
 * `scene-monolith` fracture clip.
 */
const MonolithScene = () => {
  return (
    <SceneSection id="scene-monolith" video kicker="Jan 2026 · Chapter 2">
      <div className="space-y-8">
        <Tag variant="architecture">ARCHITECTURE</Tag>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          One 6,200-line server.py was the entire backend.{" "}
          <span className="text-muted-foreground">
            Every PR was a merge-conflict risk. Parallel development was
            blocked.
          </span>
        </h2>

        {/* Countdown metric — becomes scroll-scrubbed in Phase 4 */}
        <p className="font-mono text-5xl font-semibold text-foreground sm:text-6xl md:text-7xl">
          6,200 <span className="text-muted-foreground">→</span> 109
        </p>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Activated 16 Flask blueprints, fixed relative imports across 11
          files, reduced the entry point to 109 lines. Zero logic changes,
          zero regressions. Every backend PR since is scoped to a single
          blueprint — this was the unlock that made everything else possible.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <p className="font-mono text-sm text-muted-foreground">
            Python · Flask · SQLAlchemy · PostgreSQL · Alembic
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

export default MonolithScene;
