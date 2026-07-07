"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/modules/journey/lib/scroll";
import MaskReveal from "@/modules/journey/components/MaskReveal";
import SceneVideo from "@/modules/journey/components/SceneVideo";
import { Tag, type TagVariant } from "@/components/ui/tag";

/**
 * /work - "The Deployment Log" (Master_PRP §10.6, Phase 16).
 * Reading a production system's history, not a resume: the scene-ship
 * film backs the header, the timeline rail draws itself downward with
 * scroll, and each node ignites in its tag color as the line passes.
 */

interface TimelineEvent {
  date: string;
  title: string;
  detail: string;
  tag?: string;
  variant?: TagVariant;
}

// Ignited node classes per tag variant (matches the tag color system)
const NODE_CLASS: Record<string, string> = {
  security: "bg-tag-security shadow-[0_0_10px_#ef4444]",
  architecture: "bg-tag-architecture shadow-[0_0_10px_#3b82f6]",
  ai: "bg-tag-ai shadow-[0_0_10px_#8b5cf6]",
  migration: "bg-tag-migration shadow-[0_0_10px_#f59e0b]",
  initiative: "bg-tag-initiative shadow-[0_0_10px_#10b981]",
  neutral: "bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]",
};

const AGENTNOMICS: TimelineEvent[] = [
  {
    date: "Nov 2025",
    title: "Joined as Software Engineer",
    detail: "First week: found hardcoded API keys in deploy.sh. Fixed immediately. No ramp-up.",
    tag: "SECURITY",
    variant: "security",
  },
  {
    date: "Dec 2025",
    title: "Caught two more critical vulnerabilities",
    detail: "Auth bypass on Salesforce routes + plaintext credential exposure in connections API GET response.",
    tag: "SECURITY",
    variant: "security",
  },
  {
    date: "Jan 2026",
    title: "Flask monolith decomposition",
    detail: "6,200-line server.py → 16 blueprints, 109-line entry point. Fixed relative imports across 11 files. Zero logic changes, zero regressions.",
    tag: "ARCHITECTURE",
    variant: "architecture",
  },
  {
    date: "Feb 2026",
    title: "Built pgvector RAG pipeline from scratch",
    detail: "PDF ingestion → chunk embedding → similarity search (12 chunks, 0.25 threshold) → graceful fallback to raw_text. Deployed before live client visit.",
    tag: "AI/RAG",
    variant: "ai",
  },
  {
    date: "Mar 2026",
    title: "Led 6-vendor CPaaS evaluation",
    detail: "Twilio A2P 10DLC rejected twice - voice product blocked. Evaluated SignalWire, Telnyx, Plivo, Vonage, Bandwidth, AWS Connect. Recommended SignalWire. CEO funded same day.",
    tag: "INITIATIVE",
    variant: "initiative",
  },
  {
    date: "Apr 2026",
    title: "Phase 5 frontend migration",
    detail: "Feature-slice architecture migration. 30+ files moved, zero logic changes, zero regressions. Parallel dev across the team unblocked.",
    tag: "MIGRATION",
    variant: "migration",
  },
  {
    date: "May 2026",
    title: "Stripe billing end-to-end",
    detail: "12 products across 4 categories, webhooks, checkout → trial activation confirmed e2e. Trial-gating access control with fail-closed design.",
    tag: "BILLING",
    variant: "neutral",
  },
  {
    date: "Jun 2026",
    title: "POS integrations + second migration",
    detail: "30+ files migrated. Built POS integrations for Toast, Clover, OpenTable, Resy, SevenRooms - credential masking + test-connection patterns.",
    tag: "INTEGRATION",
    variant: "neutral",
  },
  {
    date: "Jun 2026",
    title: "10-gap client readiness audit (self-initiated)",
    detail: "Before live Cafe Bollywood customer visit, identified and fixed 10 production gaps in a single branch. No one asked. Just shipped.",
    tag: "INITIATIVE",
    variant: "initiative",
  },
  {
    date: "Jul 2026",
    title: "Voice bot, LangGraph, LiteLLM contributions",
    detail: "Mid-call human handoff detection, phone skill schema, multi-agent workflow contributions. 50+ PRs total. Still shipping.",
    tag: "AI/RAG",
    variant: "ai",
  },
];

export default function WorkPage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The rail draws itself downward as you scroll through the log
        gsap.fromTo(
          "[data-rail]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-timeline]",
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          }
        );

        // Each entry ignites as the rail reaches it
        gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((item) => {
          const node = item.querySelector("[data-node]");
          const body = item.querySelector("[data-entry]");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: item, start: "top 62%", once: true },
          });
          if (node) {
            tl.fromTo(
              node,
              { opacity: 0.2, scale: 0.6 },
              { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }
            );
          }
          if (body) {
            tl.fromTo(
              body,
              { opacity: 0, x: -16 },
              { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" },
              "-=0.15"
            );
          }
        });

        gsap.from("[data-accenture]", {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-accenture]", start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="w-full">
      {/* Film-backed header - the deploy pipelines flowing */}
      <div className="relative flex min-h-[45vh] w-full flex-col justify-end overflow-hidden">
        <SceneVideo id="scene-ship" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Experience · The deployment log
            </p>
            <MaskReveal>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Where I&apos;ve worked
              </h1>
            </MaskReveal>
            <p className="text-base text-muted-foreground md:text-lg">
              8 months at Agentnomics.ai shipping production AI - security
              fixes, architecture migrations, RAG pipelines, vendor decisions,
              and client launches.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Agentnomics: sticky role block + drawing-rail log */}
        <div className="mb-24 gap-12 md:grid md:grid-cols-[260px_1fr]">
          <div className="mb-10 md:mb-0">
            <div className="space-y-3 md:sticky md:top-28">
              <h2 className="text-xl font-bold text-foreground">Agentnomics.ai</h2>
              <p className="font-mono text-sm text-muted-foreground">Software Engineer</p>
              <p className="font-mono text-xs text-muted-foreground">
                Nov 2025 – Present · Remote
              </p>
              <p className="pt-2 text-sm leading-relaxed text-muted-foreground">
                Production full-stack + AI platform work. 50+ PRs across
                Flask, pgvector, Stripe, voice infra, and POS integrations.
              </p>
            </div>
          </div>

          <div data-timeline className="relative">
            {/* The rail - draws downward with scroll */}
            <div className="absolute left-[3px] top-1 h-full w-px bg-border" />
            <div
              data-rail
              className="absolute left-[3px] top-1 h-full w-px origin-top bg-gradient-to-b from-[#22d3ee] to-[#3b82f6]"
            />

            <div className="space-y-12">
              {AGENTNOMICS.map(({ date, title, detail, tag, variant }, i) => (
                <div key={i} data-timeline-item className="relative pl-10">
                  {/* Node - ignites in its tag color as the rail passes */}
                  <div
                    data-node
                    className={`absolute left-0 top-[3px] h-[7px] w-[7px] rounded-full ${
                      variant ? NODE_CLASS[variant] : "bg-white/40"
                    }`}
                  />
                  <div data-entry className="space-y-2">
                    <span className="font-mono text-xs text-muted-foreground">{date}</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                      {tag && variant && <Tag variant={variant}>{tag}</Tag>}
                    </div>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accenture - the previous deployment */}
        <div data-accenture className="border-t border-border pt-12">
          <div className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Previous deployment
          </div>
          <div className="mb-8 flex flex-wrap items-baseline gap-4">
            <h2 className="text-xl font-bold text-foreground">Accenture</h2>
            <span className="font-mono text-sm text-muted-foreground">
              Software Engineer, SAP S/4HANA · Feb 2021 – Sep 2022 · Hyderabad, India
            </span>
          </div>
          <ul className="max-w-2xl space-y-3">
            {[
              "Built and supported enterprise software workflows across order management, pricing, delivery, invoicing, and production support.",
              "Translated business requirements into system configurations, process flows, test cases, and production-ready improvements.",
              "Collaborated with business users, QA, finance, materials management, and engineering teams to resolve issues in business-critical systems.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
