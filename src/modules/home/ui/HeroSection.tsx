import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LuLinkedin } from "react-icons/lu";

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      {/* Slot for Higgsfield background loop - <video muted autoPlay loop playsInline> goes here later */}

      {/* Status badge - styled like a git tag */}
      <div className="flex items-center gap-2 rounded-md border border-tag-initiative/30 bg-tag-initiative/10 px-3 py-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tag-initiative opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-tag-initiative" />
        </span>
        <span className="font-mono text-xs font-medium tracking-wide text-tag-initiative">
          [OPEN TO FULL-TIME ROLES]
        </span>
      </div>

      {/* Headline */}
      <div className="mx-auto max-w-4xl space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          I build AI platform infrastructure, {" "}
          <span className="text-muted-foreground">
            RAG pipelines, backend architecture, and production SaaS that stays
            secure when it ships.
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
          8 months at Agentnomics.ai. 50+ PRs merged to production. Flask
          monolith → 16 blueprints, pgvector RAG, Stripe billing, voice infra,
          POS integrations, and 3 critical security fixes along the way.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
        >
          See My Work
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href="https://www.linkedin.com/in/abdul-aziz-mohammed-87296b179"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-white/30"
        >
          <LuLinkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
