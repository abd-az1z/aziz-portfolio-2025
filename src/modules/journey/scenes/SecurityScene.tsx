"use client";

import SceneSection from "../components/SceneSection";
import { Tag } from "@/components/ui/tag";

/**
 * Scene 2 — origin: security.
 * Phase 2/4 adds the `scene-security` video backdrop + mask reveals.
 */
const FINDINGS = [
  "Hardcoded API keys in deploy.sh — found in week one, fixed immediately",
  "Auth bypass on Salesforce routes",
  "Plaintext credentials in a connections API GET response",
];

const SecurityScene = () => {
  return (
    <SceneSection id="scene-security" kicker="Nov – Dec 2025 · Chapter 1">
      <div className="space-y-8">
        <Tag variant="security">SECURITY</Tag>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          No sandbox ramp-up.{" "}
          <span className="text-muted-foreground">
            First week in production, I started finding what shouldn&apos;t be
            there.
          </span>
        </h2>
        <ul className="space-y-4">
          {FINDINGS.map((finding) => (
            <li
              key={finding}
              className="flex items-start gap-3 text-base text-muted-foreground md:text-lg"
            >
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-tag-security" />
              {finding}
            </li>
          ))}
        </ul>
        <p className="font-mono text-sm text-muted-foreground">
          3 critical vulnerabilities caught and fixed in the first two months.
        </p>
      </div>
    </SceneSection>
  );
};

export default SecurityScene;
