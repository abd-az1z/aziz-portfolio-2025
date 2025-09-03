"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

export type Project = {
  id: string;
  title: string;
  blurb: string;
  tags?: string[];
  points?: string[]; 
  video?: string; 
  link?: string;
};

const DEMO: Project[] = [
  {
    id: "callsage",
    title: "CallSage",
    blurb:
      "AI-powered video conferencing platform where custom AI agents can join, assist, and provide meeting insights.",
    points: [
      "Built with Next.js, React, TypeScript, Tailwind",
      "Stream for high-quality, real-time video calls",
      "OpenAI for intelligent, context-aware meeting participation",
      "Searchable transcripts & AI chat for instant context",
      "Subscription plans & free trials with Polar",
      "Secure auth with BetterAuth, background jobs via Inngest",
      "Neon + Drizzle ORM for type-safe database operations",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Stream",
      "OpenAI",
      "Neon",
      "Drizzle ORM",
      "BetterAuth",
      "Inngest",
    ],
    link: "https://callsage-com-8m9w-git-41-dashboa-3b22f1-azizs-projects-9895145c.vercel.app/",
    video: "/videos/CallSage.MP4",
  },
  {
    id: "saascribe",
    title: "SaaScribe AI",
    blurb:
      "AI-powered SaaS documentation assistant that reduces document creation time by 50% with AI-guided templates.",
    points: [
      "Built with Next.js, React, TypeScript, Tailwind",
      "Integrated OpenAI GPT for real-time, context-aware document generation",
      "Dynamic routing, auth & session management with Clerk",
      "Modular UI with ShadCN & Tailwind, responsive design",
      "Deployed on Vercel with CI/CD",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "OpenAI GPT",
      "Clerk",
      "Vercel",
    ],
    link: "https://github.com/abd-az1z/SaaScribe.ai",
    // video: "/videos/CallSage.MP4",
  },
  {
    id: "solvebot",
    title: "SolveBot",
    blurb:
      "AI-powered customer support chatbot reducing response time by 30% and supporting 100+ simultaneous chats.",
    points: [
      "GPT-3.5 for real-time persona-driven responses",
      "Frontend with reusable ShadCN + Tailwind components",
      "GraphQL (Apollo) + PostgreSQL (Hasura) backend",
      "Role-based dashboards & session tracking",
      "WCAG accessibility & cross-browser performance",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "GraphQL",
      "PostgreSQL",
      "Hasura",
    ],
    link: "https://github.com/abd-az1z/SolveBot",
    video: "/videos/solvebot.MP4",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    blurb:
      "Modern developer portfolio highlighting AI & SaaS projects with bold visuals and motion.",
    points: [
      "Built with Vite + React, Tailwind, Framer Motion",
      "Integrated blog & project sections",
      "Deployed on Vercel with CI/CD",
      "Dark theme with cosmic gradients and AA monogram branding",
    ],
    tags: ["React", "Vite", "Tailwind", "Framer Motion", "Vercel"],
    link: "https://aziz-portfolio-chi.vercel.app/",
    // video: "/videos/CallSage.MP4",
  },
];

function useActiveProject(initial: string) {
  const [activeId, setActiveId] = useState<string>(initial);
  return { activeId, setActiveId };
}

function ProjectVisual({
  project,
  onInView,
  isActive,
}: {
  project: Project;
  onInView: (id: string) => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "0px 0px -15% 0px" });

  // Notify parent when card is sufficiently visible
  useEffect(() => {
    if (inView) onInView(project.id);
  }, [inView, onInView, project.id]);

  // Play/Pause video only while in view; reset when leaving
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      // Attempt play; ignore promise rejection on Safari/iOS
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
      try {
        v.currentTime = 0;
      } catch {}
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative ">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] bg-gradient-to-b from-violet-700/25 via-violet-500/10 to-transparent"
      >
        {/* Header like the reference: big title + subtle arrow */}
        <div className="p-6 ">
            <h4 className="max-w-[80%] pb-6 text-xl text-white/40">
              {project.title}: {project.blurb.split(".")[0]}
            </h4>
        </div>

        {/* Media frame */}
        <div className="px-4 pb-5">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl">
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-fuchsia-500/20 via-violet-500/10 to-sky-500/0" />

            {project.video ? (
              <video
                ref={videoRef}
                muted
                playsInline
                preload="none"
                controls={false}
                className="relative z-[1] block w-full h-full aspect-[21/9] object-cover"
              >
                <source src={project.video} type="video/mp4" />
              </video>
            ) : (
              <div className="relative z-[1] grid place-content-center aspect-[21/9] text-white/70">
                No preview
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DetailPanel({ project }: { project: Project }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl border p-6 xl:p-7 shadow-xl text-white/80 border-white/25 hover:bg-accent/5"
      >
        <h3 className="mt-2 text-2xl font-semibold text-white">
          {project.title}
        </h3>
        <p className="mt-3 text-white/80 text-sm leading-relaxed">
          {project.blurb}
        </p>

        {project.points?.length ? (
          <ul className="mt-4 space-y-2 text-white/80 text-xs list-none">
            {project.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {!!project.tags?.length && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex gap-3">
          {project.link && (
            <a
              href={project.link}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium bg-white text-neutral-900 hover:bg-white/90 transition"
            >
              Visit ↗
            </a>
          )}
          <a
            href={`#${project.id}`}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border border-white/15 text-white/90 hover:bg-white/5"
          >
            Details
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ScrollSyncedShowcase({
  projects = DEMO,
}: {
  projects?: Project[];
}) {
  const { activeId, setActiveId } = useActiveProject(projects[0]?.id ?? "");
  const active = useMemo(
    () => projects.find((p) => p.id === activeId) ?? projects[0],
    [activeId, projects]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10 py-20">
      <div className="grid grid-cols-1 gap-10 xl:gap-14 lg:[grid-template-columns:minmax(0,1fr)_440px]">
        <div className="flex flex-col gap-14 scroll-smooth lg:pr-6">
          {projects.map((p) => (
            <section id={p.id} key={p.id} className="space-y-6">
              <ProjectVisual
                project={p}
                isActive={p.id === activeId}
                onInView={(id) => setActiveId(id)}
              />
              <div className="lg:hidden">
                <DetailPanel project={p} />
              </div>
            </section>
          ))}
        </div>

        <div className="hidden lg:block lg:sticky lg:top-28 h-fit self-start max-w-[440px]">
          <DetailPanel project={active} />
          <nav className="mt-4 hidden lg:flex flex-col gap-2">
            {projects.map((p, i) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className={`text-sm transition hover:text-white ${
                  p.id === activeId ? "text-white" : "text-white/50"
                }`}
              >
                {String(i + 1).padStart(2, "0")} — {p.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export function ShowcasePlayground() {
  const A = <ScrollSyncedShowcase projects={DEMO} />;
  const minimal: Project[] = [DEMO[0]];
  const B = <ScrollSyncedShowcase projects={minimal} />;
  const many: Project[] = [
    ...DEMO,
    { ...DEMO[0], id: "a1" },
    { ...DEMO[1], id: "a2" },
    { ...DEMO[2], id: "a3" },
    { ...DEMO[3], id: "a4" },
  ];
  const C = <ScrollSyncedShowcase projects={many} />;

  return (
    <div className="space-y-24">
      <section>
        <h2 className="text-white text-xl mb-4">Playground – Default</h2>
        {A}
      </section>
      <section>
        <h2 className="text-white text-xl mb-4">
          Playground – Minimal (1 item)
        </h2>
        {B}
      </section>
      <section>
        <h2 className="text-white text-xl mb-4">Playground – Many Items</h2>
        {C}
      </section>
    </div>
  );
}