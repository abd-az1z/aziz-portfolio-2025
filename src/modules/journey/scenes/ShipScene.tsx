"use client";

import SceneSection from "../components/SceneSection";
import { Tag, type TagVariant } from "@/components/ui/tag";

/**
 * Scene 6 — scale & ship.
 * Phase 5 turns this into a pinned horizontal milestone strip over the
 * ambient `scene-ship` clip. Skeleton renders the same content vertically.
 */
interface Milestone {
  date: string;
  title: string;
  detail: string;
  tag: string;
  variant: TagVariant;
}

const MILESTONES: Milestone[] = [
  {
    date: "Apr 2026",
    title: "Phase 5 frontend migration",
    detail: "Feature-slice architecture, 30+ files, zero regressions.",
    tag: "MIGRATION",
    variant: "migration",
  },
  {
    date: "May 2026",
    title: "Stripe billing end-to-end",
    detail: "12 products, 4 categories, webhooks, checkout → trial activation confirmed.",
    tag: "BILLING",
    variant: "neutral",
  },
  {
    date: "Jun 2026",
    title: "POS integrations ×5",
    detail: "Toast, Clover, OpenTable, Resy, SevenRooms — credential masking, test-connection patterns.",
    tag: "INTEGRATION",
    variant: "neutral",
  },
  {
    date: "Jun 2026",
    title: "10-gap client readiness audit",
    detail: "Self-initiated before a live customer visit. Fixed all 10 in a single branch.",
    tag: "INITIATIVE",
    variant: "initiative",
  },
];

const ShipScene = () => {
  return (
    <SceneSection id="scene-ship" video kicker="Apr – Jun 2026 · Chapter 5">
      <div className="space-y-10">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Then it was time to scale{" "}
          <span className="text-muted-foreground">— and keep shipping.</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2" data-milestone-track>
          {MILESTONES.map(({ date, title, detail, tag, variant }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-white/15"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-muted-foreground">{date}</span>
                <Tag variant={variant}>{tag}</Tag>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </SceneSection>
  );
};

export default ShipScene;
