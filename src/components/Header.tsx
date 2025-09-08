"use client";

import { CommandIcon, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import NavbarItems from "../modules/home/components/NavbarItems";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px 0px 0px'
      }
    );

    const heroSection = document.querySelector('#hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-xs",
        !isHeroInView && "py-2 "
      )}
    >
      <div className={cn(
        "mx-auto px-8 transition-all duration-300",
        isHeroInView ? "py-4 md:p-8 md:px-10" : "py-2 md:px-6"
      )}>
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isHeroInView ? "h-14" : "h-10"
        )}>
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium">
              <Image src={"/logo.png"} alt="Logo" width={30} height={30} />
            </Link>
          </div>

          {/* Navbar items */}
          <NavbarItems />

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2 rounded-md hover:bg-accent/10 transition-colors"
            aria-expanded="false"
          >
            {isMenuOpen ? (
              <Menu className="h-6 w-6 text-white" />
            ) : (
              <CommandIcon className="h-6 w-6 text-white" />
            )}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-200 ease-in-out overflow-hidden bg-background/95 backdrop-blur-sm",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-2 space-y-1">
          <NavbarItems isMobile />
        </div>
      </div>
    </header>
  );
};
export default Header;
