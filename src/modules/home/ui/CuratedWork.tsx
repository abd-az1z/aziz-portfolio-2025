import ProjectsScrollShowcase from "../components/ProjectsScrollShowcase";
import { LucideArrowRight } from "lucide-react";
import Link from "next/link";

export const CuratedWork = () => {
  return (
    <div className="w-full max-w-7xl gap-4 px-4 sm:px-6 lg:px-8 lg:max-w-7xl mx-auto md:max-w-full">
      <div className="flex flex-col items-center w-full gap-4">
        <p className="text-zinc-300 font-medium tracking-wide uppercase">
          FEATURED PROJECTS
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
          Curated <span className="font-['NyghtSerif']">work</span>
        </h2>
      </div>
      <ProjectsScrollShowcase />
      <div className="flex items-center justify-center gap-2">
        <p className="text-white tracking-wide ">
          See more projects
        </p>
        <Link href="/work" className="rounded-full  p-1 border bg-accent/10 border-accent/30 hover:bg-accent/30 hover:border-accent/10  ">
          <LucideArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
};
