"use client";

import { useRef } from "react";
import {
  Dumbbell,
  Mountain,
  Rocket,
  Car,
  Clapperboard,
  Trophy,
  Watch,
  Cpu,
  Brain,
  Salad,
  Check,
  type LucideIcon,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/modules/journey/lib/scroll";
import MaskReveal from "@/modules/journey/components/MaskReveal";
import SceneVideo from "@/modules/journey/components/SceneVideo";

/**
 * /about - "The Human Layer" (Master_PRP §10.6, Phase 18).
 * The person behind the system: the scene-now film (the amber
 * heartbeat) backs the header, the bucket list reads as a dev-native
 * coverage report that fills on scroll, and interest pills drift idly.
 */

const INTERESTS: { icon: LucideIcon; label: string }[] = [
  { icon: Dumbbell, label: "Workouts & Health" },
  { icon: Mountain, label: "Travel & Hiking" },
  { icon: Rocket, label: "Space & Astronomy" },
  { icon: Car, label: "Cars" },
  { icon: Clapperboard, label: "Sci-Fi Movies" },
  { icon: Trophy, label: "Cricket" },
  { icon: Watch, label: "Watches" },
  { icon: Cpu, label: "Gadgets & Electronics" },
  { icon: Brain, label: "Thought & Mindset" },
  { icon: Salad, label: "Diet & Nutrition" },
];

const BUCKET_LIST: { label: string; done: boolean }[] = [
  { label: "Skydiving", done: true },
  { label: "Bungee jumping", done: false },
  { label: "Scuba diving", done: false },
  { label: "Paragliding", done: false },
  { label: "Skiing", done: false },
  { label: "Boating", done: false },
  { label: "Buy my dream watch", done: false },
  { label: "Hike Mount Rainier", done: false },
  { label: "3-day camping trip", done: false },
  { label: "Visit Tokyo, Japan", done: false },
  { label: "Desert riding", done: false },
  { label: "Solo road trip", done: false },
  { label: "See the Northern Lights", done: true },
];

const DONE = BUCKET_LIST.filter((b) => b.done).length;
const TOTAL = BUCKET_LIST.length;
const PCT = Math.round((DONE / TOTAL) * 100);

const AboutPage = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Interest pills drift idly, each on its own rhythm
        gsap.utils.toArray<HTMLElement>("[data-pill]").forEach((pill, i) => {
          gsap.to(pill, {
            y: i % 2 ? 3 : -3,
            duration: 2 + Math.random() * 1.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: Math.random(),
          });
        });

        // Bucket-list coverage: the bar fills, done items check off
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-coverage]", start: "top 70%", once: true },
        });
        tl.fromTo(
          "[data-coverage-bar]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.1, ease: "power3.inOut" }
        ).from(
          "[data-done-check]",
          { scale: 0, duration: 0.4, stagger: 0.25, ease: "back.out(3)" },
          "-=0.5"
        );

        gsap.from("[data-bucket-item]", {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-coverage]", start: "top 70%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="w-full">
      {/* Film-backed header - the amber heartbeat, the human core */}
      <div className="relative flex min-h-[45vh] w-full flex-col justify-end overflow-hidden">
        <SceneVideo id="scene-now" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              About · The person behind the PRs
            </p>
            <MaskReveal>
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Beyond the code
              </h1>
            </MaskReveal>
            <p className="text-base text-muted-foreground md:text-lg">
              I&apos;m Abdul Aziz - a software engineer based in Seattle, WA. I
              joined Agentnomics.ai in November 2025 and have been shipping
              production AI systems ever since. But there&apos;s more to the
              story than the commits.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* How I learn */}
        <div className="mb-16 border-l-2 border-tag-ai/60 pl-6 md:pl-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
            How I learn
          </p>
          <p className="text-base text-foreground leading-relaxed max-w-2xl">
            I don&apos;t take courses to learn a skill. I pick the skill and
            build something real with it. Every project in my portfolio
            started as a question I needed to answer - not a tutorial I
            followed. That&apos;s the only way I know how to retain anything.
          </p>
        </div>

        {/* Interests - drifting pills */}
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Outside the terminal
          </p>
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                data-pill
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-transform duration-200 hover:scale-105 hover:border-white/20"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span>{label}</span>
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xl">
            Particularly obsessed with space - Mars colonisation, the solar
            system, and anything Elon or NASA puts up. I collect watches and
            gadgets the same way I collect side projects: always one more.
          </p>
        </div>

        {/* Bucket list - coverage report */}
        <div data-coverage className="mb-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Bucket list
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              coverage: {DONE}/{TOTAL} · {PCT}% lived
            </p>
          </div>

          {/* The coverage bar */}
          <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
            <div className="h-full" style={{ width: `${PCT}%` }}>
              <div
                data-coverage-bar
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-tag-initiative to-[#22d3ee]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BUCKET_LIST.map(({ label, done }) => (
              <div
                key={label}
                data-bucket-item
                className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                    done
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : "border-white/20 text-transparent"
                  }`}
                >
                  {done ? (
                    <span data-done-check className="flex">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  ) : (
                    <Check className="h-3 w-3" strokeWidth={3} />
                  )}
                </span>
                <span
                  className={`text-sm ${
                    done ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Always adding more. Always finding time.
          </p>
        </div>

        {/* Education + Currently looking for */}
        <div className="grid grid-cols-1 gap-10 border-t border-border pt-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Education
            </h2>
            <div>
              <p className="text-sm font-semibold text-foreground">
                MS, Information Technology Management (STEM)
              </p>
              <p className="text-sm text-muted-foreground">
                <a
                  href="https://www.campbellsville.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Campbellsville University
                </a>{" "}
                · May 2025
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                BE, Electronics and Communication Engineering
              </p>
              <p className="text-sm text-muted-foreground">
                <a
                  href="https://deccancollege.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Deccan College
                </a>{" "}
                · July 2022
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Currently looking for
            </h2>
            <p className="text-sm text-muted-foreground">
              Full-time software engineering roles at AI startups or mid-stage
              SaaS companies - backend, full-stack, or AI infrastructure focus.
              Remote or Seattle, WA.
            </p>
            <a
              href="mailto:mohdabdulaziz2023@gmail.com"
              className="inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              mohdabdulaziz2023@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
