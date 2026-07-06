"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/scroll";
import SceneVideo from "../components/SceneVideo";
import MaskReveal from "../components/MaskReveal";
import { Tag, type TagVariant } from "@/components/ui/tag";

/**
 * Scene 6 - scale & ship.
 * Desktop: the section pins and the milestone strip scrolls horizontally,
 * scrubbed - a deploy pipeline moving left to right. Mobile and
 * reduced-motion: vertical stack, no pin.
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
    detail: "Toast, Clover, OpenTable, Resy, SevenRooms - credential masking, test-connection patterns.",
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
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop with motion: pin + horizontal scrub
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const distance = () => track.scrollWidth - window.innerWidth * 0.6;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile with motion: simple stagger entry, no pin
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-milestone]", {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="scene-ship"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-24"
    >
      <SceneVideo id="scene-ship" />

      <div className="relative z-10 mx-auto mb-12 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Apr – Jun 2026 · Chapter 5
        </p>
        <MaskReveal>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Then it was time to scale{" "}
            <span className="text-muted-foreground">- and keep shipping.</span>
          </h2>
        </MaskReveal>
      </div>

      {/* Milestone strip - horizontal scrub on desktop, stack on mobile */}
      <div className="relative z-10 w-full md:overflow-hidden">
        <div
          ref={trackRef}
          className="grid grid-cols-1 gap-6 px-4 sm:px-6 md:flex md:w-max md:flex-nowrap md:gap-8 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-24 lg:px-8 md:lg:pl-[max(2rem,calc((100vw-56rem)/2))]"
        >
          {MILESTONES.map(({ date, title, detail, tag, variant }) => (
            <div
              key={title}
              data-milestone
              className="flex flex-col gap-3 rounded-xl border border-border bg-surface/90 p-6 backdrop-blur-sm transition-colors hover:border-white/15 md:w-[380px] md:shrink-0"
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
    </section>
  );
};

export default ShipScene;
