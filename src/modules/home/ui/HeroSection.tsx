import { ChevronRight, ArrowRight } from "lucide-react";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/magicui/particles";


const HeroSection = () => {
  return (
    <section className="relative w-full max-w-7xl flex gap-8 md:gap-12 items-center flex-col mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Particles Background */}
      <div className="fixed inset-0 w-screen h-screen -z-10">
        <Particles
          quantity={150}
          className="absolute inset-0 w-full h-full"
          color="#ffffff"
          vx={0.2}
          vy={0.2}
          size={0.8}
          staticity={20}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/90 to-neutral-950 -z-[5]" />
      
      {/* Announcement Banner */}
      <div className="flex  gap-2 items-center justify-center !bg-transparent border border-accent/20 rounded-full px-2 py-1 text-sm font-medium w-fit hover:bg-accent/20 transition-colors cursor-pointer ">
        <span className="px-2.5 py-0.5 bg-accent text-accent-foreground rounded-full text-xs font-medium ">
          New
        </span>
        <TextShimmer
          duration={1.2}
          spread={2}
          className="font-medium [--base-color:white] [--base-gradient-color:black]"
        >
          Project is coming soon
        </TextShimmer>
        <ChevronRight className=" h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
      </div>

      {/* Main Heading */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-20 leading-13 font-bold text-white/60 tracking-tight">
          I help founders turn ideas <br className="hidden sm:block" />
          into seamless{" "}
          <span
            className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-white italic "
            style={{ fontFamily: "NyghtSerif, serif" }}
          >
            digital experiences
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto">
          Crafting beautiful, functional, and accessible web applications with
          modern technologies.
        </p>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <div className="relative group"></div>
        <div className="text-center">
          <TextEffect className="text-xl sm:text-2xl font-medium">
            Hello, I&apos;m Abdul Aziz
          </TextEffect>
          <TextEffect className="text-xl sm:text-2xl font-medium">
            Fullstack Developer
          </TextEffect>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="group font-semibold rounded-full bg-accent/10 text-white/80 border border-white/25 hover:bg-accent/5 ">
            Let&apos;s Connect
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
