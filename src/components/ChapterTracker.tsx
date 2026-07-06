"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Chapter-aware nav (Master_PRP §10.5, Phase 10).
 *
 * Homepage only: a thin scroll-progress line under the header and the
 * current chapter label in mono, updating as the visitor moves through
 * the journey. The chrome tells the story too. Renders nothing on
 * other routes.
 */

const CHAPTERS: { id: string; label: string }[] = [
  { id: "scene-hero", label: "PROLOGUE · THE SYSTEM" },
  { id: "scene-security", label: "CH.1 · SECURITY" },
  { id: "scene-monolith", label: "CH.2 · ARCHITECTURE" },
  { id: "scene-rag", label: "CH.3 · AI/RAG" },
  { id: "scene-signal", label: "CH.4 · THE VENDOR CALL" },
  { id: "scene-ship", label: "CH.5 · SCALE & SHIP" },
  { id: "scene-now", label: "CH.6 · NOW" },
  { id: "scene-projects", label: "EPILOGUE · SIDE PROJECTS" },
  { id: "scene-contact", label: "THE NEXT CHAPTER" },
];

export const ChapterLabel = () => {
  const pathname = usePathname();
  const [label, setLabel] = useState(CHAPTERS[0].label);

  useEffect(() => {
    if (pathname !== "/") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const hit = CHAPTERS.find((c) => c.id === entry.target.id);
            if (hit) setLabel(hit.label);
          }
        }
      },
      // A slim band around the viewport's upper-middle decides the chapter
      { rootMargin: "-35% 0px -55% 0px" }
    );

    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <span
      key={label}
      className="hidden animate-[fadeSlideIn_0.4s_ease] font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground lg:block"
    >
      {label}
    </span>
  );
};

export const ScrollProgress = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathname !== "/") return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden" aria-hidden>
      <div
        className="h-full origin-left bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
