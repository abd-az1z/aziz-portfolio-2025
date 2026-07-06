"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SceneSection from "../components/SceneSection";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 5 — the call: vendor.
 * Phase 4 adds the `scene-signal` clip (6 routes collapsing to 1).
 */
const VENDORS = ["SignalWire", "Telnyx", "Plivo", "Vonage", "Bandwidth", "AWS Connect"];

const SignalScene = () => {
  return (
    <SceneSection id="scene-signal" kicker="Mar 2026 · Chapter 4">
      <div className="space-y-8">
        <Tag variant="initiative">BUSINESS IMPACT</Tag>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Twilio rejected A2P 10DLC registration. Twice.{" "}
          <span className="text-muted-foreground">
            The voice product was completely blocked — so I found the way
            around.
          </span>
        </h2>

        {/* 6 → 1 vendor collapse — animated in Phase 4 */}
        <div className="flex flex-wrap gap-2">
          {VENDORS.map((vendor) => (
            <span
              key={vendor}
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

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          Self-initiated a 6-vendor CPaaS evaluation across cost, compliance,
          and API compatibility. Recommended SignalWire as a drop-in
          Compatibility API replacement. The CEO funded the account within
          hours — the evaluation cost ~3 hours; the alternative was weeks of
          compliance limbo.
        </p>

        <div className="flex flex-wrap items-center gap-6">
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
