import { ArrowRight } from "lucide-react";
import { LuLinkedin, LuGithub } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";

const ContactCTA = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-border bg-surface p-10 md:p-16">
        <div className="mx-auto max-w-2xl space-y-8 text-center">
          {/* Status */}
          <div className="inline-flex items-center gap-2 rounded-md border border-tag-initiative/30 bg-tag-initiative/10 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tag-initiative opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tag-initiative" />
            </span>
            <span className="font-mono text-xs font-medium tracking-wide text-tag-initiative">
              [OPEN TO FULL-TIME ROLES]
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              Looking for a full-time role at an AI startup or mid-stage SaaS
              company. If you&apos;re building something that ships to
              production and needs an engineer who cares about security and
              reliability — let&apos;s talk.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="mailto:mohdabdulaziz2023@gmail.com"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              Send me an email
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
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

          {/* Secondary links */}
          <div className="flex items-center justify-center gap-6 border-t border-border pt-8">
            <a
              href="https://github.com/abd-az1z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LuGithub className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://x.com/MdAbdul13067562"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <RiTwitterXLine className="h-4 w-4" />
              X / Twitter
            </a>
            <span className="font-mono text-xs text-muted-foreground">
              Seattle, WA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
