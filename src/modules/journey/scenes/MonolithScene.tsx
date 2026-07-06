"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/scroll";
import SceneSection from "../components/SceneSection";
import MaskReveal from "../components/MaskReveal";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 3 — the unlock: architecture. The showpiece scroll moment:
 * the scene pins and the 6,200 → 109 countdown scrubs with scroll
 * while the supporting copy rises in.
 */
const MonolithScene = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const section = root.current?.closest("section");
        if (!section) return;

        const counter = { n: 6200 };
        const el = root.current!.querySelector("[data-count]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.5,
          },
        });

        tl.from("[data-monolith-body]", { opacity: 0, y: 30, duration: 0.3 }, 0)
          .to(
            counter,
            {
              n: 109,
              duration: 1,
              ease: "power2.inOut",
              onUpdate: () => {
                if (el) el.textContent = Math.round(counter.n).toLocaleString("en-US");
              },
            },
            0
          )
          .from("[data-monolith-footer]", { opacity: 0, y: 20, duration: 0.25 }, 0.6);
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <SceneSection id="scene-monolith" video animate={false} kicker="Jan 2026 · Chapter 2">
      <div ref={root} className="space-y-8">
        <Tag variant="architecture">ARCHITECTURE</Tag>
        <MaskReveal>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            One 6,200-line server.py was the entire backend.{" "}
            <span className="text-muted-foreground">
              Every PR was a merge-conflict risk. Parallel development was
              blocked.
            </span>
          </h2>
        </MaskReveal>

        {/* Countdown metric — scrubbed 6,200 → 109 while the scene is pinned */}
        <p className="font-mono text-5xl font-semibold text-foreground sm:text-6xl md:text-7xl">
          <span data-count>6,200</span>{" "}
          <span className="text-muted-foreground">lines</span>
        </p>

        <p data-monolith-body className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Activated 16 Flask blueprints, fixed relative imports across 11
          files, reduced the entry point to 109 lines. Zero logic changes,
          zero regressions. Every backend PR since is scoped to a single
          blueprint — this was the unlock that made everything else possible.
        </p>

        <div data-monolith-footer className="flex flex-wrap items-center gap-6">
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
