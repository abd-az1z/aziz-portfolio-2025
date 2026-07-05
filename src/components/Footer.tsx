import Link from "next/link";
import { LuLinkedin, LuGithub } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";
import { Mail } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdul-aziz-mohammed-87296b179",
    Icon: LuLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/abd-az1z",
    Icon: LuGithub,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/MdAbdul13067562",
    Icon: RiTwitterXLine,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="space-y-3">
            <p className="font-mono text-sm text-foreground">Abdul Aziz Mohammed</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Software engineer building production AI platforms — RAG
              pipelines, backend architecture, and SaaS infrastructure.
            </p>
            <a
              href="mailto:mohdabdulaziz2023@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              mohdabdulaziz2023@gmail.com
            </a>
          </div>

          <nav className="flex gap-8" aria-label="Footer">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground">
            © {currentYear} Abdul Aziz Mohammed
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Seattle, WA · Open to full-time roles
          </p>
        </div>
      </div>
    </footer>
  );
}
