"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LuGithub } from "react-icons/lu";
import { Tag, type TagVariant } from "@/components/ui/tag";
import { PROJECTS, type Project } from "@/data/projects";

type Filter = "all" | "ai" | "production" | "saas" | "infra";

interface FilterOption {
  id: Filter;
  label: string;
}

const FILTERS: FilterOption[] = [
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

function ProjectCard({ project }: { project: Project }) {
  const { label, variant } = TAG_MAP[project.id] ?? {
    label: "PROJECT",
    variant: "neutral" as TagVariant,
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-white/15">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
        <Tag variant={variant}>{label}</Tag>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.blurb}
      </p>

      {project.points && project.points.length > 0 && (
        <ul className="space-y-1.5">
          {project.points.slice(0, 3).map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
              {point}
            </li>
          ))}
        </ul>
      )}

      <p className="font-mono text-xs text-muted-foreground">
        {project.tags?.join(" · ")}
      </p>

      <div className="flex items-center gap-4 border-t border-border pt-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <LuGithub className="h-4 w-4" />
            GitHub
          </a>
        )}
        {project.link && project.link !== project.github && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="h-4 w-4" />
            Live
          </a>
        )}
      </div>
    </div>
  );
}

export default function WorkPage() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => PROJECT_FILTERS[p.id]?.includes(active));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 space-y-3">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Projects
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Things I&apos;ve built
        </h1>
        <p className="max-w-xl text-base text-muted-foreground">
          Side projects and production work - AI agents, SaaS tools, and
          infrastructure built end-to-end.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === id
                ? "bg-white text-black"
                : "border border-border text-muted-foreground hover:border-white/20 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
  );
}
