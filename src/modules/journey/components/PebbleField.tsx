"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/scroll";

/**
 * Pebble field finale (Master_PRP §10.5, Phase 15).
 *
 * A bed of node-pebbles resting on the contact section's floor. The
 * cursor kicks them around - they bounce off walls, floor, and each
 * other with springy physics, then settle back under gravity.
 * Bookends the constellation hero: the site opens and closes with a
 * system reacting to your touch.
 *
 * Canvas 2D, zero dependencies. Fine-pointer desktops only; never
 * rendered on mobile or under prefers-reduced-motion. Pauses when
 * off-screen.
 */

const COUNT = 220;
const GRAVITY = 0.25;
const AIR = 0.995;
const BOUNCE = 0.55;
const FLOOR_FRICTION = 0.92;
const CURSOR_RADIUS = 90;
const CURSOR_KICK = 2.4;

// Palette sampled from the six scene films: security's cyan streams and
// red anomaly, the monolith's teal circuitry, RAG's violet point cloud,
// the signal's emerald route, ship's deep-blue grid, now's amber core.
const COLORS = [
  // security - cyan data streams (dominant hue of the film)
  "rgba(34,211,238,0.55)",
  "rgba(103,232,249,0.4)",
  // security - the red anomaly (rare)
  "rgba(239,68,68,0.6)",
  // monolith - teal circuitry
  "rgba(45,212,191,0.5)",
  "rgba(20,184,166,0.4)",
  // rag - violet point cloud
  "rgba(139,92,246,0.55)",
  "rgba(167,139,250,0.4)",
  // signal - emerald route
  "rgba(16,185,129,0.55)",
  "rgba(52,211,153,0.4)",
  // ship - deep blue grid
  "rgba(59,130,246,0.5)",
  "rgba(96,165,250,0.35)",
  // now - amber core (rare, like the film)
  "rgba(245,158,11,0.55)",
  // quiet connective tissue
  "rgba(255,255,255,0.2)",
  "rgba(255,255,255,0.12)",
];

interface Pebble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

const PebbleField = () => {
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    setEnabled(desktop && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const pebbles: Pebble[] = [];
    const cursor = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 };
    let raf = 0;
    let running = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Seed: scattered along the floor with a little variance
    for (let i = 0; i < COUNT; i++) {
      const r = 2.5 + Math.random() * 5.5;
      pebbles.push({
        x: Math.random() * W,
        y: H - r - Math.random() * 70,
        vx: 0,
        vy: 0,
        r,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    const step = () => {
      // Cursor velocity (how hard the visitor is "kicking")
      cursor.vx = cursor.x - cursor.px;
      cursor.vy = cursor.y - cursor.py;
      cursor.px = cursor.x;
      cursor.py = cursor.y;

      for (const p of pebbles) {
        // Cursor kick: push away, harder when the cursor moves fast
        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const d = Math.hypot(dx, dy);
        if (d < CURSOR_RADIUS && d > 0.001) {
          const force = ((CURSOR_RADIUS - d) / CURSOR_RADIUS) * CURSOR_KICK;
          const speed = Math.min(Math.hypot(cursor.vx, cursor.vy), 40) * 0.06 + 0.4;
          p.vx += (dx / d) * force * speed;
          p.vy += (dy / d) * force * speed - force * 0.3; // slight pop upward
        }

        p.vy += GRAVITY;
        p.vx *= AIR;
        p.vy *= AIR;
        p.x += p.vx;
        p.y += p.vy;

        // Walls + floor + ceiling
        if (p.x < p.r) { p.x = p.r; p.vx *= -BOUNCE; }
        if (p.x > W - p.r) { p.x = W - p.r; p.vx *= -BOUNCE; }
        if (p.y > H - p.r) { p.y = H - p.r; p.vy *= -BOUNCE; p.vx *= FLOOR_FRICTION; }
        if (p.y < p.r) { p.y = p.r; p.vy *= -BOUNCE; }
      }

      // Pebble-pebble collisions (positional separation + impulse swap)
      for (let i = 0; i < pebbles.length; i++) {
        for (let j = i + 1; j < pebbles.length; j++) {
          const a = pebbles[i];
          const b = pebbles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.hypot(dx, dy);
          const min = a.r + b.r;
          if (d < min && d > 0.001) {
            const nx = dx / d;
            const ny = dy / d;
            const overlap = (min - d) / 2;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            const rel = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny;
            if (rel > 0) {
              const imp = rel * 0.5 * BOUNCE;
              a.vx -= nx * imp;
              a.vy -= ny * imp;
              b.vx += nx * imp;
              b.vy += ny * imp;
            }
          }
        }
      }

      ctx.clearRect(0, 0, W, H);
      for (const p of pebbles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(step);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only simulate while visible
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "50px" }
    );
    io.observe(parent);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      cursor.x = -9999;
      cursor.y = -9999;
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      io.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0"
    />
  );
};

export default PebbleField;
