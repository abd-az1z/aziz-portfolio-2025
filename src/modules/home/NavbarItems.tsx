"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "More", href: "/more" },
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
                ? "bg-accent/10 text-foreground"
                : "text-foreground/80 hover:bg-accent/5"
            )}
            onClick={() => setSelected(link.href)}
          >
            {link.label}
          </Link>
        ))}
        <button 
          className="w-full mt-2 py-3 text-base font-medium rounded-lg border-2 border-foreground/10 hover:border-foreground/20 transition-colors"
        >
          Book a Call
        </button>
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
      <button         
        className="ml-2 px-4 py-2 text-sm font-medium rounded-full border-2 border-white/10 hover:border-white/50 transition-colors"
      >
        Book a Call
      </button>
    </div>
  );
};

export default NavbarItems;
