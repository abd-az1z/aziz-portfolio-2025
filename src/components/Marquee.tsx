"use client";

import React, { useMemo, useState } from "react";
import { FaReact } from "react-icons/fa";

const items = [
  { text: "ReactJS", icon: <FaReact /> },
  { text: "NextJS", icon: "" },
  { text: "TypeScript", icon: "" },
  { text: "TailwindCSS", icon: "" },
  { text: "Motion", icon: "" },
  { text: "ShadCN", icon: "" },
];

export function Marquee({
  speed = 40, // seconds for one full cycle
}: {
  speed?: number;
}) {
  // Duplicate items once to get a seamless loop
  const track = useMemo(() => [...items, ...items], []);
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden bg-transparent shadow-sm p-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Keyframes local to this component */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); } /* -50% because we duplicated the content */
        }
      `}</style>

      <div
        className="flex items-center gap-4 will-change-transform"
        style={{
          // Run the marquee across 2x content width (duplicated),
          // then shift -50% to create a seamless loop.
          width: "max-content",
          animation: `marquee ${speed}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {track.map((item, i) => (
          <div
            key={i}
            className={`px-4 py-2 bg-black text-white/80 border border-white/25 rounded-md text-sm font-medium  w-full whitespace-nowrap`}
          >
            <div className="flex gap-1 items-center">
              {item.icon}
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
