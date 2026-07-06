import { cn } from "@/lib/utils";

export type TagVariant =
  | "security"
  | "architecture"
  | "ai"
  | "migration"
  | "initiative"
  | "neutral";

const VARIANT_CLASSES: Record<TagVariant, string> = {
  security: "text-tag-security bg-tag-security/10",
  architecture: "text-tag-architecture bg-tag-architecture/10",
  ai: "text-tag-ai bg-tag-ai/10",
  migration: "text-tag-migration bg-tag-migration/10",
  initiative: "text-tag-initiative bg-tag-initiative/10",
  neutral: "text-muted-foreground bg-white/5",
};

interface TagProps {
  variant?: TagVariant;
  children: React.ReactNode;
  className?: string;
}

export function Tag({ variant = "neutral", children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded px-1.5 py-0.5 font-mono text-[11px] font-medium tracking-wide",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      [{children}]
    </span>
  );
}
