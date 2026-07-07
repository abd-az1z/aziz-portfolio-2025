"use client";

import { usePathname } from "next/navigation";
import { LuLinkedin, LuGithub } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";

export const SOCIALS = [
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
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // The homepage journey carries its own finale footer inside ContactCTA
  if (pathname === "/") return null;

  return (
    <footer className="relative z-10 border-t border-border bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          © {currentYear} Abdul Aziz Mohammed
        </p>

        <div className="flex gap-2">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
