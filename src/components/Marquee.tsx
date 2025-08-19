"use client";

import React from "react";
import { FaReact, FaNodeJs, FaGithub, FaAws } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiTypescript,
  SiShadcnui,
  SiHtml5,
  SiCss3,
  SiJavascript,
} from "react-icons/si";

type MarqueeItem = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

const frontendItems: MarqueeItem[] = [
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7E02C" },
  { name: "React", icon: <FaReact />, color: "#58C4DC" },
  { name: "Next.js", icon: <RiNextjsFill />, color: "#FFFFFF" },
  { name: "HTML", icon: <SiHtml5 />, color: "#E5532E" },
  { name: "CSS", icon: <SiCss3 />, color: "#1153EA" },
  { name: "Tailwind", icon: <RiTailwindCssFill />, color: "#0DBCFF" },
  { name: "ShadCN UI", icon: <SiShadcnui />, color: "#FFFFFF" },
];

const backendItems: MarqueeItem[] = [
  { name: "Node.js", icon: <FaNodeJs />, color: "#68A063" },
  { name: "Express", icon: <span>🚀</span>, color: "#000000" },
  { name: "MongoDB", icon: <span>🍃</span>, color: "#47A248" },
  { name: "PostgreSQL", icon: <span>🐘</span>, color: "#336791" },
  { name: "GraphQL", icon: <span>🔷</span>, color: "#E10098" },
  { name: "REST API", icon: <span>🌐</span>, color: "#2196F3" },
];

const devOpsItems: MarqueeItem[] = [
  { name: "Docker", icon: <span>🐳</span>, color: "#2496ED" },
  { name: "Git", icon: <FaGithub />, color: "#F05032" },
  { name: "GitHub Actions", icon: <FaGithub />, color: "#2088FF" },
  { name: "CI/CD", icon: <span>🔄</span>, color: "#00C7B7" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900" },
  { name: "Vercel", icon: <span>▲</span>, color: "#ffffff" },
];

const Marquee = ({ speed = 40 }: { speed?: number }) => {
  const [paused, setPaused] = React.useState(false);
  const duplicateCount = 4; 

  const renderMarqueeItems = (items: MarqueeItem[], direction: 'normal' | 'reverse' = 'normal') => {
    // Duplicate items for seamless looping
    const duplicatedItems = [...items, ...items, ...items, ...items];

    return (
      <div 
        className="marquee-track"
        style={{
          '--animation': `marquee${direction === 'reverse' ? 'Reverse' : ''}`,
          '--speed': `${speed}s`,
          '--play-state': paused ? 'paused' : 'running',
        } as React.CSSProperties}
      >
        {duplicatedItems.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="px-4 py-2 mx-2 bg-black text-white/80 border border-white/25 rounded-md text-sm font-medium whitespace-nowrap flex-shrink-0"
          >
            <div className="flex gap-2 items-center">
              <span className="size-4 flex items-center justify-center" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-4">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .marquee-container {
          display: flex;
          white-space: nowrap;
          width: max-content;
        }
        .marquee-track {
          display: flex;
          animation: var(--animation) var(--speed) linear infinite;
          animation-play-state: var(--play-state);
          padding: 0 1rem;
        }
      `}</style>

      <div className="space-y-8 w-full">
        {/* Frontend Skills */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="marquee-container">
            {renderMarqueeItems(frontendItems)}
          </div>
        </div>

        {/* Backend Skills - Reverse direction */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="marquee-container">
            {renderMarqueeItems(backendItems, 'reverse')}
          </div>
        </div>

        {/* DevOps Skills */}
        <div 
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="marquee-container">
            {renderMarqueeItems(devOpsItems)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
