import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Tag, type TagVariant } from "@/components/ui/tag";

interface CaseStudy {
  tag: string;
  variant: TagVariant;
  title: string;
  metric: string;
  detail: string;
  stack: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    tag: "ARCHITECTURE",
    variant: "architecture",
    title: "Flask Monolith Decomposition",
    metric: "6,200 → 109",
    detail: "16 blueprints activated, zero regressions",
    stack: ["Python", "Flask", "SQLAlchemy", "PostgreSQL"],
  },
  {
    tag: "AI/RAG",
    variant: "ai",
    title: "RAG Pipeline for Restaurant AI Bot",
    metric: "PDF → pgvector",
    detail: "Menu Q&A live before client visit",
    stack: ["Python", "Flask", "pgvector", "OpenAI"],
  },
  {
    tag: "BUSINESS IMPACT",
    variant: "initiative",
    title: "CPaaS Vendor Migration",
    metric: "6 vendors → 1",
    detail: "CEO funded SignalWire within hours",
    stack: ["SignalWire", "Python", "Twilio API"],
  },
];

const CaseStudies = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted-foreground">
        Featured Case Studies
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {CASE_STUDIES.map(({ tag, variant, title, metric, detail, stack }) => (
          <Link
            key={title}
            href="/work"
            className="group flex flex-col gap-5 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-white/15"
          >
            <Tag variant={variant} className="self-start">
              {tag}
            </Tag>

            <h3 className="text-lg font-semibold text-foreground">{title}</h3>

            <div className="space-y-1">
              <p className="font-mono text-2xl font-semibold text-foreground">
                {metric}
              </p>
              <p className="text-sm text-muted-foreground">{detail}</p>
            </div>

            <p className="mt-auto text-sm text-muted-foreground">
              {stack.join(" · ")}
            </p>

            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              View Case Study
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;
