"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/scroll";

/**
 * The companion node — "follow one commit through the career."
 *
 * A single glowing node (visually one of the hero constellation's) that
 * travels down the page as you scroll and plays a role in every chapter:
 * turns red as the security anomaly (then gets "caught" and fixed),
 * splits into 16 blocks at the monolith, dissolves into a point cloud
 * for RAG, rides the winning route as the signal pulse, becomes a
 * deploy packet on the ship strip, pulses amber at "now", and finally
 * docks as the green status dot at contact.
 *
 * Grabbable: pointer-drag flings it, release springs it back to its
 * place in the story. Desktop fine-pointer only; never rendered on
 * mobile or under prefers-reduced-motion.
 */

const DOT_COUNT = 16;

type Formation = "single" | "grid" | "cloud" | "packet";

interface Waypoint {
  /** CSS selector of the section that owns this waypoint */
  trigger: string;
  /** ScrollTrigger start, default "top center" */
  start?: string;
  /** Viewport-relative position of the node, in % */
  x: number;
  y: number;
  color: string;
  formation: Formation;
  scale?: number;
  /** Continuous heartbeat pulse while this waypoint is active */
  pulse?: boolean;
}

const WAYPOINTS: Waypoint[] = [
  // Hero: one bright node among the constellation
  { trigger: "#scene-hero", x: 72, y: 38, color: "#22d3ee", formation: "single" },
  // Security: it IS the anomaly…
  { trigger: "#scene-security", x: 82, y: 30, color: "#ef4444", formation: "single", scale: 1.25 },
  // …then it gets caught and fixed
  { trigger: "#scene-security", start: "40% center", x: 80, y: 55, color: "#22d3ee", formation: "single" },
  // Monolith: splits into 16 modular blocks
  { trigger: "#scene-monolith", x: 80, y: 40, color: "#3b82f6", formation: "grid" },
  // RAG: dissolves into a vector point cloud
  { trigger: "#scene-rag", x: 79, y: 45, color: "#8b5cf6", formation: "cloud" },
  // Signal: the pulse riding the one winning route
  { trigger: "#scene-signal", x: 84, y: 35, color: "#10b981", formation: "packet" },
  // Ship: a deploy packet moving with the strip
  { trigger: "#scene-ship", x: 70, y: 75, color: "#22d3ee", formation: "packet" },
  // Now: settles into the pulsing core
  { trigger: "#scene-now", x: 78, y: 40, color: "#f59e0b", formation: "single", scale: 1.4, pulse: true },
  // Contact: docks as the green status dot
  { trigger: "#scene-contact", x: 88, y: 25, color: "#10b981", formation: "single", scale: 0.8, pulse: true },
];

// Child-dot offsets per formation (px, relative to node center)
const FORMATIONS: Record<Formation, [number, number][]> = {
  single: Array.from({ length: DOT_COUNT }, () => [0, 0]),
  grid: Array.from({ length: DOT_COUNT }, (_, i) => [
    ((i % 4) - 1.5) * 14,
    (Math.floor(i / 4) - 1.5) * 14,
  ]),
  cloud: Array.from({ length: DOT_COUNT }, (_, i) => {
    // Deterministic scatter (stable across renders)
    const a = i * 2.399963; // golden angle
    const r = 8 + (i % 5) * 7;
    return [Math.cos(a) * r * 1.4, Math.sin(a) * r];
  }),
  packet: Array.from({ length: DOT_COUNT }, (_, i) => [(i % 4) * 5 - 7.5, 0]),
};

const CompanionNode = () => {
  const [enabled, setEnabled] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  // Current waypoint the node springs back to after a drag
  const activeWp = useRef<Waypoint>(WAYPOINTS[0]);
  const dragging = useRef(false);

  useEffect(() => {
    const desktop = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    setEnabled(desktop && !prefersReducedMotion());
  }, []);

  useGSAP(
    () => {
      if (!enabled || !nodeRef.current) return;
      const node = nodeRef.current;
      const dots = Array.from(node.children) as HTMLElement[];

      const px = (wp: Waypoint) => ({
        x: (wp.x / 100) * window.innerWidth,
        y: (wp.y / 100) * window.innerHeight,
      });

      let pulseTween: gsap.core.Tween | null = null;

      const applyWaypoint = (wp: Waypoint) => {
        activeWp.current = wp;
        if (!dragging.current) {
          gsap.to(node, { ...px(wp), duration: 1.1, ease: "power3.inOut", overwrite: "auto" });
        }
        gsap.to(node, { scale: wp.scale ?? 1, duration: 0.8, ease: "power2.out" });
        FORMATIONS[wp.formation].forEach(([dx, dy], i) => {
          gsap.to(dots[i], {
            x: dx,
            y: dy,
            backgroundColor: wp.color,
            boxShadow: `0 0 ${wp.formation === "single" ? 18 : 8}px ${wp.color}`,
            duration: 0.9,
            ease: "back.out(1.4)",
            stagger: 0,
            overwrite: "auto",
          });
        });
        pulseTween?.kill();
        pulseTween = wp.pulse
          ? gsap.to(node, { scale: (wp.scale ?? 1) * 1.25, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut" })
          : null;
      };

      // Initial state
      gsap.set(node, px(WAYPOINTS[0]));
      applyWaypoint(WAYPOINTS[0]);

      // A waypoint activates entering its zone (down) and re-activates
      // scrolling back up past it.
      WAYPOINTS.forEach((wp, i) => {
        ScrollTrigger.create({
          trigger: wp.trigger,
          start: wp.start ?? "top center",
          onEnter: () => applyWaypoint(wp),
          onEnterBack: () => applyWaypoint(wp),
          onLeaveBack: i > 0 ? () => applyWaypoint(WAYPOINTS[i - 1]) : undefined,
        });
      });

      // Re-anchor on resize (positions are viewport-relative)
      const onResize = () => !dragging.current && gsap.set(node, px(activeWp.current));
      window.addEventListener("resize", onResize);

      // Grab + fling: drag freely, release springs it home
      const onDown = (e: PointerEvent) => {
        dragging.current = true;
        node.setPointerCapture(e.pointerId);
        gsap.killTweensOf(node, "x,y");
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging.current) return;
        gsap.set(node, { x: e.clientX, y: e.clientY });
      };
      const onUp = () => {
        if (!dragging.current) return;
        dragging.current = false;
        gsap.to(node, { ...px(activeWp.current), duration: 1.3, ease: "elastic.out(1, 0.45)" });
      };
      node.addEventListener("pointerdown", onDown);
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerup", onUp);
      node.addEventListener("pointercancel", onUp);

      return () => {
        window.removeEventListener("resize", onResize);
        node.removeEventListener("pointerdown", onDown);
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerup", onUp);
        node.removeEventListener("pointercancel", onUp);
        pulseTween?.kill();
      };
    },
    { dependencies: [enabled] }
  );

  if (!enabled) return null;

  return (
    <div
      ref={nodeRef}
      aria-hidden
      className="fixed left-0 top-0 z-40 h-0 w-0 cursor-grab touch-none active:cursor-grabbing"
    >
      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <span
          key={i}
          className="absolute -left-[4px] -top-[4px] h-2 w-2 rounded-full"
          style={{ backgroundColor: "#22d3ee", boxShadow: "0 0 18px #22d3ee" }}
        />
      ))}
    </div>
  );
};

export default CompanionNode;
