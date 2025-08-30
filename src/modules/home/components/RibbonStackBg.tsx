"use client";

import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { cn } from "@/lib/utils";

const WORDS = [
  "AI-POWERED VIDEO CALLS",
] as const;

const Separator = () => (
  <span className="mx-6 text-white/70">✦</span>
);

export default function RibbonStackBg({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden -top-14 rotate-[3deg]",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0456FB] via-purple-600 to-indigo-600 opacity-90" />
      <InfiniteSlider
        gap={0}
        speed={120}
        direction="horizontal"
        className="relative py-4 text-white font-semibold tracking-widest uppercase"
      >
        {WORDS.map((w, i) => (
          <div key={i} className="flex items-center">
            <span className="opacity-0">{w}</span>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}