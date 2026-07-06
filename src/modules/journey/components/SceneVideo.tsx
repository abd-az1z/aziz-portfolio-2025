"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../lib/scroll";

/**
 * Full-bleed scene backdrop (Master_PRP §3, §6).
 *
 * Looks for `/videos/<id>.webm` + `/videos/<id>.mp4` with poster
 * `/videos/posters/<id>.webp`. Degradation ladder (no scene may ever
 * white-screen the page):
 *   1. video (desktop, motion OK)
 *   2. poster image (reduced-motion, or video failed but poster exists)
 *   3. animated CSS glow tinted per scene (no assets exist yet - Phase 6
 *      swaps in real Higgsfield clips with zero code changes)
 *
 * Every backdrop sits under a radial #0A0A0F vignette + ~3% film grain so
 * text stays readable and AI footage blends into the UI.
 */

// Inline SVG feTurbulence noise - self-contained film grain, no asset.
const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Scene "energy" hues for the CSS-glow fallback (glow accent lives only
// inside scenes, never on flat UI - Master_PRP §3).
const GLOW: Record<string, string> = {
  "scene-security": "rgba(239,68,68,0.07)",
  "scene-monolith": "rgba(59,130,246,0.08)",
  "scene-rag": "rgba(139,92,246,0.08)",
  "scene-signal": "rgba(16,185,129,0.07)",
  "scene-ship": "rgba(34,211,238,0.06)",
  "scene-now": "rgba(34,211,238,0.07)",
};

interface SceneVideoProps {
  /** Scene id, e.g. "scene-monolith" - maps to /videos/<id>.* */
  id: string;
}

const SceneVideo = ({ id }: SceneVideoProps) => {
  // "video" | "poster" | "glow"
  const [mode, setMode] = useState<"video" | "poster" | "glow">("glow");
  const poster = `/videos/posters/${id}.webp`;

  useEffect(() => {
    let cancelled = false;

    const probe = async (url: string) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok;
      } catch {
        return false;
      }
    };

    (async () => {
      // Mobile + reduced-motion are poster-first (Master_PRP §8): no
      // multi-MB autoplay loops on phone data plans.
      const mobile = !window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
      if (prefersReducedMotion() || mobile) {
        if ((await probe(poster)) && !cancelled) setMode("poster");
        return;
      }
      if ((await probe(`/videos/${id}.webm`)) || (await probe(`/videos/${id}.mp4`))) {
        if (!cancelled) setMode("video");
      } else if (await probe(poster)) {
        if (!cancelled) setMode("poster");
      }
      // else: stay on glow
    })();

    return () => {
      cancelled = true;
    };
  }, [id, poster]);

  const glow = GLOW[id] ?? "rgba(34,211,238,0.06)";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {mode === "video" && (
        <video
          className="absolute inset-0 h-full w-full object-cover brightness-[0.55]"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster={poster}
          onError={() => setMode("glow")}
        >
          <source src={`/videos/${id}.webm`} type="video/webm" />
          <source src={`/videos/${id}.mp4`} type="video/mp4" />
        </video>
      )}

      {mode === "poster" && (
        // eslint-disable-next-line @next/next/no-img-element -- decorative full-bleed backdrop; next/image adds nothing here
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[0.55]"
          onError={() => setMode("glow")}
        />
      )}

      {mode === "glow" && (
        <div
          className="absolute inset-0 motion-safe:animate-pulse [animation-duration:8s]"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 45%, ${glow}, transparent 70%)`,
          }}
        />
      )}

      {/* Vignette - blends every backdrop into #0A0A0F and darkens the
          content area so text stays readable over any footage */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(10,10,15,0.55) 0%, #0A0A0F 100%)",
        }}
      />

      {/* Film grain - unifies AI footage with the UI, hides compression */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URI }}
      />

      {/* Edge feather - the scene's first and last pixels are exactly the
          page background, so adjacent sections dissolve into each other and
          the page reads as one continuous surface (no seam lines). */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0A0A0F_0%,transparent_25%,transparent_75%,#0A0A0F_100%)]" />
    </div>
  );
};

export default SceneVideo;
