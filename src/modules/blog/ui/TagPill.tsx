export default function TagPill({ label, active }: { label: string; active?: boolean }) {
    return (
      <span className={`inline-flex items-center rounded-md px-3 py-1 text-xs
        border ${active ? "bg-white/10 border-white/30" : "border-white/10"}
      `}>
        {label}
      </span>
    );
  }