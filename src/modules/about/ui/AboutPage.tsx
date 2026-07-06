import { Tag } from "@/components/ui/tag";
import type { TagVariant } from "@/components/ui/tag";

interface TimelineEvent {
  date: string;
  title: string;
  detail: string;
  tag?: string;
  variant?: TagVariant;
}

const TIMELINE: TimelineEvent[] = [
  {
    date: "Nov 2025",
    title: "Joined Agentnomics.ai as Software Engineer",
    detail: "First week: found hardcoded API keys in deploy.sh. Fixed immediately. No ramp-up.",
    tag: "SECURITY",
    variant: "security",
  },
  {
    date: "Dec 2025",
    title: "Caught two more critical vulnerabilities",
    detail: "Auth bypass on Salesforce routes + plaintext credential exposure in connections API GET response.",
    tag: "SECURITY",
    variant: "security",
  },
  {
    date: "Jan 2026",
    title: "Flask monolith decomposition",
    detail: "6,200-line server.py → 16 blueprints, 109-line entry point. Fixed relative imports across 11 files. Zero logic changes, zero regressions.",
    tag: "ARCHITECTURE",
    variant: "architecture",
  },
  {
    date: "Feb 2026",
    title: "Built pgvector RAG pipeline from scratch",
    detail: "PDF ingestion → chunk embedding → similarity search (12 chunks, 0.25 threshold) → graceful fallback to raw_text. Deployed before live client visit.",
    tag: "AI/RAG",
    variant: "ai",
  },
  {
    date: "Mar 2026",
    title: "Led 6-vendor CPaaS evaluation",
    detail: "Twilio A2P 10DLC rejected twice - voice product blocked. Evaluated SignalWire, Telnyx, Plivo, Vonage, Bandwidth, AWS Connect. Recommended SignalWire. CEO funded same day.",
    tag: "INITIATIVE",
    variant: "initiative",
  },
  {
    date: "Apr 2026",
    title: "Phase 5 frontend migration",
    detail: "Feature-slice architecture migration. 30+ files moved, zero logic changes, zero regressions. Parallel dev across the team unblocked.",
    tag: "MIGRATION",
    variant: "migration",
  },
  {
    date: "May 2026",
    title: "Stripe billing end-to-end",
    detail: "12 products across 4 categories, webhooks, checkout → trial activation confirmed e2e. Trial-gating access control with fail-closed design.",
    tag: "BILLING",
    variant: "neutral",
  },
  {
    date: "Jun 2026",
    title: "Phase 7 migration + POS integrations",
    detail: "Second feature-slice migration (30+ files). Built POS integrations for Toast, Clover, OpenTable, Resy, SevenRooms - credential masking + test-connection patterns.",
    tag: "INTEGRATION",
    variant: "neutral",
  },
  {
    date: "Jun 2026",
    title: "10-gap client readiness audit (self-initiated)",
    detail: "Before live Cafe Bollywood customer visit, identified and fixed 10 production gaps in a single branch. No one asked. Just shipped.",
    tag: "INITIATIVE",
    variant: "initiative",
  },
  {
    date: "Jul 2026",
    title: "Voice bot, LangGraph, LiteLLM contributions",
    detail: "Mid-call human handoff detection, phone skill schema, multi-agent workflow contributions. 50+ PRs total. Still shipping.",
    tag: "AI/RAG",
    variant: "ai",
  },
];

const AboutPage = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 max-w-2xl space-y-4">
        <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
          About
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          The arc
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          I&apos;m Abdul Aziz - a software engineer who joined Agentnomics.ai
          in November 2025 and immediately touched production. No sandbox
          ramp-up. What followed was 8 months of security fixes, architecture
          migrations, AI pipelines, vendor decisions, and client-facing
          launches.
        </p>
        <p className="text-base text-muted-foreground">
          I&apos;m targeting full-time roles at AI startups and mid-stage SaaS
          companies. MS, ITM · Campbellsville. Based in Seattle, WA.
        </p>
      </div>

      {/* Timeline */}
      <div className="mb-20">
        <h2 className="mb-10 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Agentnomics.ai · Nov 2025 – Present
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 h-full w-px bg-border md:left-[140px]" />

          <div className="space-y-0">
            {TIMELINE.map(({ date, title, detail, tag, variant }, i) => (
              <div
                key={i}
                className="relative flex flex-col gap-2 pb-10 pl-6 md:flex-row md:gap-10 md:pl-0"
              >
                {/* Date */}
                <div className="shrink-0 md:w-[140px] md:text-right">
                  <span className="font-mono text-xs text-muted-foreground">
                    {date}
                  </span>
                </div>

                {/* Dot */}
                <div className="absolute left-[-4px] top-[2px] h-2 w-2 rounded-full border border-border bg-background md:left-[136px]" />

                {/* Content */}
                <div className="flex-1 space-y-2 md:pl-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      {title}
                    </h3>
                    {tag && variant && (
                      <Tag variant={variant}>{tag}</Tag>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Side projects & education row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Education
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                MS, Information Technology Management (STEM)
              </p>
              <p className="text-sm text-muted-foreground">
                <a
                  href="https://www.campbellsville.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Campbellsville University
                </a>
                {" "}· May 2025
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                BE, Electronics and Communication Engineering
              </p>
              <p className="text-sm text-muted-foreground">
                <a
                  href="https://deccancollege.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Deccan College
                </a>
                {" "}· July 2022
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
          <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Currently looking for
          </h2>
          <p className="text-sm text-muted-foreground">
            Full-time software engineering roles at AI startups or mid-stage
            SaaS companies - backend, full-stack, or AI infrastructure focus.
            Remote or Seattle, WA.
          </p>
          <a
            href="mailto:mohdabdulaziz2023@gmail.com"
            className="inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            mohdabdulaziz2023@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
