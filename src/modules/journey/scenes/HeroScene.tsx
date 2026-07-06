"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { LuLinkedin } from "react-icons/lu";
import { prefersReducedMotion } from "../lib/scroll";

// The only WebGL on the site - client-only, code-split away from every
// other route. Mobile and reduced-motion never even download this chunk.
const Constellation = dynamic(() => import("../components/Constellation"), {
  ssr: false,
});

/**
 * Scene 1 - the system.
 * Desktop + motion OK: living constellation (R3F), unmounted when the
 * hero scrolls out of view so it costs nothing below the fold.
 * Mobile / reduced-motion: static radial glow fallback.
 */
const HeroScene = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [webglOk, setWebglOk] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    // Gate: desktop pointer + motion allowed (post-mount, no hydration mismatch)
    const desktop = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    setWebglOk(desktop && !prefersReducedMotion());

    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scene-hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Backdrop: constellation on capable desktops, static glow otherwise */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_60%)]" />
        {webglOk && inView && (
          <div className="absolute inset-0 [&_canvas]:!pointer-events-none">
            <Constellation />
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        {/* Status badge - git-tag treatment (v1 rule) */}
        <div className="flex items-center gap-2 rounded-md border border-tag-initiative/30 bg-tag-initiative/10 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tag-initiative opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tag-initiative" />
          </span>
          <span className="font-mono text-xs font-medium tracking-wide text-tag-initiative">
            [OPEN TO FULL-TIME ROLES]
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          I build AI platform infrastructure,{" "}
          <span className="text-muted-foreground">
            RAG pipelines, backend architecture, and production SaaS that stays
            secure when it ships.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
          8 months at Agentnomics.ai. 50+ PRs merged to production. This is the
          story of how that happened - scroll through it.
        </p>

        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            See My Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="https://www.linkedin.com/in/abdul-aziz-mohammed-87296b179"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/30"
          >
            <LuLinkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ArrowDown className="h-5 w-5 animate-bounce text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroScene;
