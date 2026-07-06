"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NavbarItems from "../modules/home/components/NavbarItems";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm",
        scrolled ? "border-b border-border" : ""
      )}
    >
      <div className="mx-auto px-6 md:px-10">
        <div className={cn(
          "relative flex items-center justify-between transition-all duration-300",
          scrolled ? "h-12" : "h-16"
        )}>
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center">
            <Image src="/images/logo.png" alt="Logo" width={28} height={28} priority />
          </Link>

          {/* Nav links — absolutely centered */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <NavbarItems />
          </div>

          {/* Get in Touch — right */}
          <a
            href="mailto:mohdabdulaziz2023@gmail.com"
            className="hidden md:inline-block px-4 py-1.5 text-sm font-medium rounded-full border border-white/10 hover:border-white/25 transition-colors"
          >
            Get in Touch
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((o) => !o)}
            className="md:hidden p-2 -mr-2 rounded-md hover:bg-white/5 transition-colors"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-200 ease-in-out bg-background/98 border-b border-border",
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-3">
          <NavbarItems isMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;
