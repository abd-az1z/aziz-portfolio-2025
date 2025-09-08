"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  // { label: "Blog", href: "/blog" },
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
            href="tel:+12012681964"
            className="w-full block py-3 text-base font-medium rounded-lg border-2 border-foreground hover:border-foreground/20 transition-colors relative overflow-hidden text-center"
          >
            <span className="relative z-10">Book a Call</span>
            <BorderTrail className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
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
      <div className="relative group ml-2">
        <a 
          href="tel:+12012681964"
          className="inline-block px-4 py-2 text-sm font-medium rounded-full border-1 border-white/10 relative overflow-hidden hover:border-white/20 transition-colors"
        >
          <span className="relative z-10">Book a Call</span>
          <BorderTrail className="opacity-100 transition-opacity" size={20} />
        </a>
      </div>
    </div>
  );
};

export default NavbarItems;
