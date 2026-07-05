import { Tag, type TagVariant } from "@/components/ui/tag";

interface ArcItem {
  tag: string;
  variant: TagVariant;
  text: string;
}

const ARC: ArcItem[] = [
  {
    tag: "SECURITY",
    variant: "security",
    text: "Caught and fixed 3 critical security vulnerabilities: hardcoded API keys in deploy.sh, auth bypass on Salesforce routes, plaintext credentials in connections API",
  },
  {
    tag: "ARCHITECTURE",
    variant: "architecture",
    text: "Refactored a 6,200-line Flask monolith into 16 blueprints, enabling parallel feature development across the team",
  },
  {
    tag: "AI/RAG",
    variant: "ai",
    text: "Built a pgvector RAG pipeline powering restaurant bot menu Q&A: PDF ingestion, chunk embedding, similarity search, graceful fallback",
  },
  {
    tag: "VENDOR",
    variant: "neutral",
    text: "Led CPaaS vendor evaluation across 6 providers - recommended SignalWire, adopted by CEO within hours",
  },
  {
    tag: "MIGRATION",
    variant: "migration",
    text: "Designed and executed Phase 5 + Phase 7 frontend migrations into feature-slice architecture (30+ files each, zero regressions)",
  },
  {
    tag: "BILLING",
    variant: "neutral",
    text: "Shipped Stripe billing end-to-end: 12 products, webhooks, checkout → trial activation confirmed",
  },
  {
    tag: "INTEGRATION",
    variant: "neutral",
    text: "Built POS integrations: Toast, Clover, OpenTable, Resy, SevenRooms",
  },
  {
    tag: "INITIATIVE",
    variant: "initiative",
    text: "Self-initiated 10-gap client readiness audit before live Cafe Bollywood visit - resolved all 10 gaps in a single branch",
  },
];

const WorkExperience = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted-foreground">
        Work Experience
      </h2>

      <div className="rounded-xl border border-border bg-surface p-6 md:p-10">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">
              Agentnomics.ai
            </h3>
            <p className="text-sm text-muted-foreground">
              Software Engineer
            </p>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            Nov 2025 – Present · Remote
          </p>
        </div>

        <ul className="space-y-5">
          {ARC.map(({ tag, variant, text }) => (
            <li
              key={tag}
              className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4"
            >
              <span className="sm:w-36">
                <Tag variant={variant}>{tag}</Tag>
              </span>
              <p className="flex-1 text-sm leading-relaxed text-foreground/80">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WorkExperience;
