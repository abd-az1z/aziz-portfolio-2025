"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/scroll";
import SceneSection from "../components/SceneSection";
import MaskReveal from "../components/MaskReveal";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 2 - origin: security.
 * Findings stagger in like audit log entries; the tag snaps in first.
 */
const FINDINGS = [
  "Hardcoded API keys in deploy.sh - found in week one, fixed immediately",
  "Auth bypass on Salesforce routes",
  "Plaintext credentials in a connections API GET response",
];

const SecurityScene = () => {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            once: true,
          },
        });

        tl.from("[data-sec-tag]", {
          scale: 0.7,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(2)",
        })
          .from(
            "[data-sec-finding]",
            {
              opacity: 0,
              x: -24,
              duration: 0.5,
              stagger: 0.18,
              ease: "power3.out",
            },
            0.3
          )
          .from("[data-sec-footer]", { opacity: 0, y: 16, duration: 0.5 }, "-=0.1");
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <SceneSection id="scene-security" video animate={false} kicker="Nov – Dec 2025 · Chapter 1">
      <div ref={root} className="space-y-8">
        <div data-sec-tag className="inline-block">
          <Tag variant="security">SECURITY</Tag>
        </div>
        <MaskReveal>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            No sandbox ramp-up.{" "}
            <span className="text-muted-foreground">
              First week in production, I started finding what shouldn&apos;t be
              there.
            </span>
          </h2>
        </MaskReveal>
        <ul className="space-y-4">
          {FINDINGS.map((finding) => (
            <li
              key={finding}
              data-sec-finding
              className="flex items-start gap-3 text-base text-muted-foreground md:text-lg"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tag-security" />
              {finding}
            </li>
          ))}
        </ul>
        <p data-sec-footer className="font-mono text-sm text-muted-foreground">
          3 critical vulnerabilities caught and fixed in the first two months.
        </p>
      </div>
    </SceneSection>
  );
};

export default SecurityScene;
