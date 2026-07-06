"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Single registration point for GSAP plugins — import this module anywhere
// scroll animation is needed and ScrollTrigger is guaranteed registered.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Journey scroll foundation: Lenis smooth scroll synced to ScrollTrigger.
 * - Skipped entirely under prefers-reduced-motion (native scroll, no smoothing).
 * - Cleans up Lenis + ticker on unmount so other routes are untouched.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}

export { gsap, ScrollTrigger };
