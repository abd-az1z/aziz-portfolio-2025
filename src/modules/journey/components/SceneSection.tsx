"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/scroll";
import SceneVideo from "./SceneVideo";

interface SceneSectionProps {
  id: string;
  /** Mono kicker above the content, e.g. "NOV–DEC 2025 · SECURITY" */
  kicker?: string;
  /** Render a SceneVideo backdrop for this scene id (defaults to `id`) */
  video?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Shared full-viewport scene shell. Content fades/rises in on scroll entry;
 * instant (no animation) under prefers-reduced-motion via gsap.matchMedia.
 */
const SceneSection = ({ id, kicker, video = false, children, className = "" }: SceneSectionProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-scene-content]", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  // Touch ScrollTrigger so tree-shaking never drops the registration import.
  void ScrollTrigger;

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8 ${className}`}
    >
      {video && <SceneVideo id={id} />}
      <div data-scene-content className="relative z-10 mx-auto w-full max-w-4xl">
        {kicker && (
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {kicker}
          </p>
        )}
        {children}
      </div>
    </section>
  );
};

export default SceneSection;
