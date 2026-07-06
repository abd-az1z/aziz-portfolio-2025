"use client";

import { useSmoothScroll } from "./lib/scroll";

import HeroScene from "./scenes/HeroScene";
import SecurityScene from "./scenes/SecurityScene";
import MonolithScene from "./scenes/MonolithScene";
import RagScene from "./scenes/RagScene";
import SignalScene from "./scenes/SignalScene";
import ShipScene from "./scenes/ShipScene";
import NowScene from "./scenes/NowScene";

// Scenes 8–10 reuse the existing v1 sections (per Master_PRP §4)
import StatsBar from "@/modules/home/ui/StatsBar";
import SideProjects from "@/modules/home/ui/SideProjects";
import ContactCTA from "@/modules/home/ui/ContactCTA";
import { FadeIn } from "@/components/ui/fade-in";
import CompanionNode from "./components/CompanionNode";

/**
 * The Journey - cinematic scroll-driven homepage (Master_PRP v2).
 * Ten scenes, top to bottom: the 8-month Agentnomics arc as a documentary.
 */
const JourneyView = () => {
  useSmoothScroll();

  return (
    <div className="relative w-full bg-background">
      {/* The companion node - follows the scroll, morphs per chapter */}
      <CompanionNode />
      <main className="relative z-0">
        {/* 1 - the system (WebGL hero lands here in Phase 3) */}
        <HeroScene />

        {/* 2–7 - the arc */}
        <SecurityScene />
        <MonolithScene />
        <RagScene />
        <SignalScene />
        <ShipScene />
        <NowScene />

        {/* 8 - proof */}
        <StatsBar />

        {/* 9 - side projects */}
        <FadeIn>
          <SideProjects />
        </FadeIn>

        {/* 10 - contact (id anchors the companion node's final waypoint) */}
        <div id="scene-contact">
          <FadeIn delay={0.05}>
            <ContactCTA />
          </FadeIn>
        </div>
      </main>
    </div>
  );
};

export default JourneyView;
