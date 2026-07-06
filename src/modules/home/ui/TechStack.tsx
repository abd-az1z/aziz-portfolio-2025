import { Tag, type TagVariant } from "@/components/ui/tag";

interface StackItem {
  name: string;
  note?: string;
}

interface StackCategory {
  label: string;
  tag: string;
  variant: TagVariant;
  items: StackItem[];
}

const STACK: StackCategory[] = [
  {
    label: "AI & ML",
    tag: "AI/RAG",
    variant: "ai",
    items: [
      { name: "pgvector", note: "RAG pipelines" },
      { name: "LangChain" },
      { name: "LiteLLM" },
      { name: "LangGraph", note: "multi-agent" },
      { name: "OpenAI SDK" },
      { name: "Anthropic SDK" },
      { name: "Pinecone" },
    ],
  },
  {
    label: "Backend",
    tag: "ARCHITECTURE",
    variant: "architecture",
    items: [
      { name: "Python" },
      { name: "Flask", note: "blueprints" },
      { name: "SQLAlchemy" },
      { name: "Alembic" },
      { name: "PostgreSQL" },
      { name: "Neon", note: "serverless" },
      { name: "Drizzle ORM" },
    ],
  },
  {
    label: "Frontend",
    tag: "MIGRATION",
    variant: "migration",
    items: [
      { name: "Next.js 16", note: "App Router" },
      { name: "React 19" },
      { name: "TypeScript" },
      { name: "Tailwind CSS v4" },
      { name: "Framer Motion v12" },
    ],
  },
  {
    label: "Infrastructure",
    tag: "INITIATIVE",
    variant: "initiative",
    items: [
      { name: "AWS", note: "EC2, ECR, RDS, S3" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "GitHub Actions" },
      { name: "n8n" },
    ],
  },
  {
    label: "Integrations",
    tag: "INTEGRATION",
    variant: "neutral",
    items: [
      { name: "Stripe", note: "billing + webhooks" },
      { name: "SignalWire", note: "CPaaS" },
      { name: "Toast / Clover", note: "POS" },
      { name: "OpenTable / Resy" },
      { name: "Inngest" },
    ],
  },
  {
    label: "Security",
    tag: "SECURITY",
    variant: "security",
    items: [
      { name: "Auth hardening" },
      { name: "Credential masking" },
      { name: "Fail-closed access control" },
      { name: "Trial-gating" },
    ],
  },
];

const TechStack = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="mb-8 font-mono text-sm uppercase tracking-widest text-muted-foreground">
        Tech Stack
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map(({ label, tag, variant, items }) => (
          <div
            key={label}
            className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{label}</h3>
              <Tag variant={variant}>{tag}</Tag>
            </div>

            <ul className="space-y-2">
              {items.map(({ name, note }) => (
                <li key={name} className="flex items-baseline justify-between gap-4">
                  <span className="text-sm text-foreground/80">{name}</span>
                  {note && (
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
