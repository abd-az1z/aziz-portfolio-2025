"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/scroll";
import SceneSection from "../components/SceneSection";
import MaskReveal from "../components/MaskReveal";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 5 — the call: vendor.
 * All six vendors appear as equals, then the field collapses: five dim
 * and drift back, SignalWire holds bright — the decision, animated.
 */
const VENDORS = ["SignalWire", "Telnyx", "Plivo", "Vonage", "Bandwidth", "AWS Connect"];

const SignalScene = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            once: true,
          },
        });

        // 1. All six candidates enter as equals
        tl.from("[data-vendor]", {
          opacity: 0,
          y: 14,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        })
          // 2. The field collapses — losers dim, the winner holds
          .to(
            "[data-vendor='candidate']",
            {
              opacity: 0.3,
              scale: 0.96,
              duration: 0.6,
              ease: "power2.inOut",
            },
            "+=0.5"
          )
          .to(
            "[data-vendor='winner']",
            { scale: 1.06, duration: 0.6, ease: "back.out(1.7)" },
            "<"
          )
          .from("[data-signal-body]", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
          .from("[data-signal-footer]", { opacity: 0, y: 16, duration: 0.4 }, "-=0.2");
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <SceneSection id="scene-signal" video animate={false} kicker="Mar 2026 · Chapter 4">
      <div ref={root} className="space-y-8">
        <Tag variant="initiative">BUSINESS IMPACT</Tag>
        <MaskReveal>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Twilio rejected A2P 10DLC registration. Twice.{" "}
            <span className="text-muted-foreground">
              The voice product was completely blocked — so I found the way
              around.
            </span>
          </h2>
        </MaskReveal>

        {/* 6 → 1 vendor collapse */}
        <div className="flex flex-wrap gap-2">
          {VENDORS.map((vendor) => (
            <span
              key={vendor}
              data-vendor={vendor === "SignalWire" ? "winner" : "candidate"}
              className={`rounded-md border px-3 py-1.5 font-mono text-sm ${
                vendor === "SignalWire"
                  ? "border-tag-initiative/40 bg-tag-initiative/10 text-tag-initiative"
                  : "border-border text-muted-foreground"
              }`}
            >
              {vendor}
            </span>
          ))}
        </div>

        <p data-signal-body className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Self-initiated a 6-vendor CPaaS evaluation across cost, compliance,
          and API compatibility. Recommended SignalWire as a drop-in
          Compatibility API replacement. The CEO funded the account within
          hours — the evaluation cost ~3 hours; the alternative was weeks of
          compliance limbo.
        </p>

        <div data-signal-footer className="flex flex-wrap items-center gap-6">
          <p className="font-mono text-sm text-muted-foreground">
            SignalWire · Python · Flask · Twilio Compatibility API
          </p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            View Case Study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </SceneSection>
  );
};

export default SignalScene;
