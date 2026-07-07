"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { gsap, prefersReducedMotion } from "@/modules/journey/lib/scroll";
import MaskReveal from "@/modules/journey/components/MaskReveal";
import SceneVideo from "@/modules/journey/components/SceneVideo";
import { Tag, type TagVariant } from "@/components/ui/tag";
import { PROJECTS, type Project } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Flip);
}

/**
 * /projects - "The Lab" (Master_PRP §10.6, Phase 17).
 * A bench of running experiments: the scene-rag film backs the header,
 * each card carries a tag-colored spotlight that tracks the cursor plus
 * a subtle spring-back tilt, and filter changes FLIP cards to their new
 * positions instead of snapping.
 */

type Filter = "all" | "ai" | "production" | "saas" | "infra";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / Agents" },
  { id: "saas", label: "SaaS" },
  { id: "production", label: "Production" },
  { id: "infra", label: "Infrastructure" },
];

const PROJECT_FILTERS: Record<string, Filter[]> = {
  "ai-triage": ["ai", "production"],
  promptshrink: ["ai", "saas"],
  prchangelog: ["ai", "saas"],
  saascribe: ["ai", "saas"],
  callsage: ["ai", "saas"],
  aicortex: ["ai", "infra"],
  solvebot: ["ai", "saas"],
};

const TAG_MAP: Record<string, { label: string; variant: TagVariant }> = {
  "ai-triage": { label: "AGENTIC AI", variant: "ai" },
  promptshrink: { label: "AI TOOLING", variant: "ai" },
  prchangelog: { label: "AI / SAAS", variant: "neutral" },
  saascribe: { label: "AI / SAAS", variant: "neutral" },
  callsage: { label: "FULL-STACK / AI", variant: "architecture" },
  aicortex: { label: "AI INFRA", variant: "migration" },
  solvebot: { label: "AI / ACCESSIBLE", variant: "initiative" },
};

// Spotlight glow color per tag variant
const GLOW: Record<TagVariant, string> = {
  security: "rgba(239,68,68,0.10)",
  architecture: "rgba(59,130,246,0.10)",
  ai: "rgba(139,92,246,0.12)",
  migration: "rgba(245,158,11,0.10)",
  initiative: "rgba(16,185,129,0.10)",
  neutral: "rgba(255,255,255,0.06)",
};

const MAX_TILT = 4; // degrees

function ProjectCard({ project }: { project: Project }) {
  const { label, variant } = TAG_MAP[project.id] ?? {
    label: "PROJECT",
    variant: "neutral" as TagVariant,
  };
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot || prefersReducedMotion()) return;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Spotlight follows the cursor
    spot.style.background = `radial-gradient(240px circle at ${px * 100}% ${py * 100}%, ${GLOW[variant]}, transparent 70%)`;
    spot.style.opacity = "1";

    // Subtle tilt toward the cursor
    gsap.to(card, {
      rotateY: (px - 0.5) * MAX_TILT * 2,
      rotateX: (0.5 - py) * MAX_TILT * 2,
      transformPerspective: 700,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (spot) spot.style.opacity = "0";
    if (card && !prefersReducedMotion()) {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    }
  };

  return (
    <div
      ref={cardRef}
      data-project-card
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-surface p-6 transition-colors hover:border-white/15 [transform-style:preserve-3d]"
    >
      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      />

      <div className="relative flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <Tag variant={variant}>{label}</Tag>
      </div>
      <p className="relative flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.blurb}
      </p>
      {project.points && project.points.length > 0 && (
        <ul className="relative space-y-1.5">
          {project.points.slice(0, 3).map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
              {point}
            </li>
          ))}
        </ul>
      )}
      <p className="relative font-mono text-xs text-muted-foreground">
        {project.tags?.join(" · ")}
      </p>
      <div className="relative flex items-center gap-4 border-t border-border pt-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <LuGithub className="h-4 w-4" /> GitHub
          </a>
        )}
        {project.link && project.link !== project.github && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" /> Live
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const root = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? PROJECTS : PROJECTS.filter((p) => PROJECT_FILTERS[p.id]?.includes(active));

  // Capture positions before the filter re-render...
  const changeFilter = (next: Filter) => {
    if (next === active) return;
    if (gridRef.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-project-card]"));
    }
    setActive(next);
  };

  // ...then FLIP surviving cards into their new spots, fade newcomers in
  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, {
      duration: 0.5,
      ease: "power3.inOut",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.25 }),
    });
    flipState.current = null;
  }, [active]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-project-card]", {
          opacity: 0,
          y: 24,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="w-full">
      {/* Film-backed header - the lab's data cloud */}
      <div className="relative flex min-h-[45vh] w-full flex-col justify-end overflow-hidden">
        <SceneVideo id="scene-rag" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Projects · The lab
            </p>
            <MaskReveal>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Things I&apos;ve built
              </h1>
            </MaskReveal>
            <p className="max-w-xl text-base text-muted-foreground">
              Side projects and production work - AI agents, SaaS tools, and
              infrastructure built end-to-end.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => changeFilter(id)}
              className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                active === id
                  ? "bg-white text-black"
                  : "border border-border text-muted-foreground hover:border-white/20 hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-sm text-muted-foreground">
            No projects match this filter.
          </p>
        )}
      </div>
    </div>
  );
}
