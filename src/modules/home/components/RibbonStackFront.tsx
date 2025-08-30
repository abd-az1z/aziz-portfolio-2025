"use client";

import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { cn } from "@/lib/utils";

const WORDS = [
  "AI-POWERED VIDEO CALLS",
  "CONTEXT-AWARE MEETING AGENTS",
  "SEARCHABLE TRANSCRIPTS",
  "SUBSCRIPTION PLANS & FREE TRIALS",
  "SECURE AUTHENTICATION",
  "BACKGROUND JOBS",
  "TYPE-SAFE DATABASE",
  "50% FASTER DOCUMENT CREATION",
  "DYNAMIC ROUTING",
  "CUSTOMER SUPPORT CHATBOT",
  "30% FASTER RESPONSES",
  "100+ SIMULTANEOUS CHATS",
  "ROLE-BASED ACCESS",
  "WCAG ACCESSIBILITY",
  "RESPONSIVE, MOBILE-FIRST",
] as const;

const Separator = () => (
  <span className="mx-6 text-white/70">✦</span>
);

export default function RibbonStackFront({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rotate-[-3deg]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-[#0456FB] opacity-90" />
      <InfiniteSlider
        gap={0}
        speed={120}
        direction="horizontal"
        className="relative py-4 text-white font-semibold tracking-widest uppercase"
      >
        {WORDS.map((w, i) => (
          <div key={i} className="flex items-center">
            <span>{w}</span>
            <Separator />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}