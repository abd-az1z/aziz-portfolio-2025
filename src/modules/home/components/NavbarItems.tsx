"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
];

interface NavbarItemsProps {
  isMobile?: boolean;
}

const NavbarItems = ({ isMobile = false }: NavbarItemsProps) => {
  const pathname = usePathname();
  const [selected, setSelected] = useState("/");

  // Update selected based on current route
  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  if (isMobile) {
    return (
      <div className="space-y-4 py-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
              selected === link.href
                ? "bg-accent/10 text-white/80"
                : "text-foreground/80 hover:bg-accent/5"
            )}
            onClick={() => setSelected(link.href)}
          >
            {link.label}
          </Link>
        ))}
        <div className="relative mt-2">
          <a
            href="mailto:mohdabdulaziz2023@gmail.com"
            className="w-full block py-3 text-base font-medium rounded-lg border border-white/15 hover:border-white/30 transition-colors text-center"
          >
            Get in Touch
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden  md:flex items-center space-x-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors",
            selected === link.href
              ? "bg-accent/10 text-white/80 border border-white/25 hover:bg-accent/5"
              : "text-white/50 hover:bg-accent/5"
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavbarItems;
