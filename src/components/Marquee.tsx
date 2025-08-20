"use client";

import React from "react";
import { FaReact, FaNodeJs, FaGithub, FaAws } from "react-icons/fa";
import { SiTypescript, SiShadcnui, SiHtml5, SiCss3, SiJavascript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiDocker } from "react-icons/si";
import { InfiniteSlider } from "./motion-primitives/infinite-slider";

type MarqueeItem = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

const frontendItems: MarqueeItem[] = [
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7E02C" },
  { name: "React", icon: <FaReact />, color: "#58C4DC" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
  { name: "HTML", icon: <SiHtml5 />, color: "#E5532E" },
  { name: "CSS", icon: <SiCss3 />, color: "#1153EA" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#0DBCFF" },
  { name: "ShadCN UI", icon: <SiShadcnui />, color: "#FFFFFF" },
];

const backendItems: MarqueeItem[] = [
  { name: "Node.js", icon: <FaNodeJs />, color: "#68A063" },
  { name: "Express", icon: <span>🚀</span>, color: "#000000" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
  { name: "GraphQL", icon: <span>🔷</span>, color: "#E10098" },
  { name: "REST API", icon: <span>🌐</span>, color: "#2196F3" },
];

const devOpsItems: MarqueeItem[] = [
  { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
  { name: "Git", icon: <FaGithub />, color: "#F05032" },
  { name: "GitHub Actions", icon: <FaGithub />, color: "#2088FF" },
  { name: "CI/CD", icon: <span>🔄</span>, color: "#00C7B7" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900" },
  { name: "Vercel", icon: <span>▲</span>, color: "#ffffff" },
];

const Marquee = ({ speed = 50 }: { speed?: number }) => {
  const renderMarqueeSection = (items: MarqueeItem[], reverse = false) => (
    <div className="relative w-full bg-transparent overflow-hidden py-2">
      <InfiniteSlider 
        speed={speed} 
        reverse={reverse}
        className="py-2"
      >
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="px-4 py-2  mx-2  text-white/80 border border-white/25 rounded-md text-sm font-medium whitespace-nowrap flex-shrink-0"
          >
            <div className="flex gap-2 items-center">
              <span className="size-4 flex items-center justify-center" style={{ color: item.color }}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </InfiniteSlider>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );

  return (
    <div className="space-y-4 w-full">
      {/* Frontend Skills */}
      {renderMarqueeSection(frontendItems)}
      
      {/* Backend Skills */}
      {renderMarqueeSection(backendItems, true)}
      
      {/* DevOps Skills */}
      {renderMarqueeSection(devOpsItems)}
    </div>
  );
};

export default Marquee;
