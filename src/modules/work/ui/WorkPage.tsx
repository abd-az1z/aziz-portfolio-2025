"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/modules/journey/lib/scroll";
import MaskReveal from "@/modules/journey/components/MaskReveal";
import { Tag, type TagVariant } from "@/components/ui/tag";

interface TimelineEvent {
  date: string;
  title: string;
  detail: string;
  tag?: string;
  variant?: TagVariant;
}

// Timeline node classes per tag variant (matches the tag color system)
const NODE_CLASS: Record<string, string> = {
  security: "bg-tag-security shadow-[0_0_8px_#ef4444]",
  architecture: "bg-tag-architecture shadow-[0_0_8px_#3b82f6]",
  ai: "bg-tag-ai shadow-[0_0_8px_#8b5cf6]",
  migration: "bg-tag-migration shadow-[0_0_8px_#f59e0b]",
  initiative: "bg-tag-initiative shadow-[0_0_8px_#10b981]",
  neutral: "bg-white/50",
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

function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 h-full w-px bg-border md:left-[140px]" />
      <div className="space-y-0">
        {events.map(({ date, title, detail, tag, variant }, i) => (
          <div
            key={i}
            data-timeline-item
            className="relative flex flex-col gap-2 pb-10 pl-6 md:flex-row md:gap-10 md:pl-0"
          >
            <div className="shrink-0 md:w-[140px] md:text-right">
              <span className="font-mono text-xs text-muted-foreground">{date}</span>
            </div>
            <div
              className={`absolute left-[-4px] top-[2px] h-2 w-2 rounded-full md:left-[136px] ${
                variant ? NODE_CLASS[variant] : "bg-white/30"
              }`}
            />
            <div className="flex-1 space-y-2 md:pl-10">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                {tag && variant && <Tag variant={variant}>{tag}</Tag>}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WorkPage() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-timeline-item]", {
          opacity: 0,
          x: -20,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-timeline-item]",
            start: "top 75%",
            once: true,
          },
        });
        gsap.from("[data-accenture]", {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-accenture]",
            start: "top 80%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 max-w-2xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Experience · The deployment log
        </p>
        <MaskReveal>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Where I&apos;ve worked
          </h1>
        </MaskReveal>
        <p className="text-base text-muted-foreground md:text-lg">
          8 months at Agentnomics.ai shipping production AI - security fixes,
          architecture migrations, RAG pipelines, vendor decisions, and client
          launches.
        </p>
      </div>

      {/* Agentnomics */}
      <div className="mb-20">
        <div className="mb-10 flex flex-wrap items-baseline gap-4">
          <h2 className="text-xl font-bold text-foreground">Agentnomics.ai</h2>
          <span className="font-mono text-sm text-muted-foreground">
            Software Engineer · Nov 2025 – Present · Remote
          </span>
        </div>
        <Timeline events={AGENTNOMICS} />
      </div>

      {/* Accenture */}
      <div data-accenture>
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
  );
}
