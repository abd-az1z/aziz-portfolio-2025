"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/scroll";
import SceneSection from "../components/SceneSection";
import MaskReveal from "../components/MaskReveal";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 7 — now. The arc lands in the present: heading masks in,
 * then the live status badge and the ask settle into place.
 */
const NowScene = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            once: true,
          },
        });

        tl.from("[data-now-badge]", {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "back.out(2)",
          delay: 0.4,
        }).from("[data-now-body]", { opacity: 0, y: 20, duration: 0.5 }, "-=0.15");
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <SceneSection id="scene-now" video animate={false} kicker="Jul 2026 · Now">
      <div ref={root} className="space-y-8">
        <Tag variant="ai">AI/RAG</Tag>
        <MaskReveal>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Voice bots with mid-call human handoff. LangGraph multi-agent
            workflows. LiteLLM.{" "}
            <span className="text-muted-foreground">50+ PRs in. Still shipping.</span>
          </h2>
        </MaskReveal>

        <div data-now-badge className="inline-flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tag-initiative opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tag-initiative" />
          </span>
          <span className="font-mono text-xs font-medium tracking-wide text-tag-initiative">
            [OPEN TO FULL-TIME ROLES]
          </span>
        </div>

        <p data-now-body className="max-w-2xl text-base text-muted-foreground md:text-lg">
          From security fixes to architecture decisions in 8 months. The next
          chapter is a full-time role at an AI startup or mid-stage SaaS
          company — backend, full-stack, or AI infrastructure.
        </p>
      </div>
    </SceneSection>
  );
};

export default NowScene;
