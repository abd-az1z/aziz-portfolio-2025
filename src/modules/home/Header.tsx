"use client";

import { CommandIcon, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import NavbarItems from "./NavbarItems";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-xs "
      )}
    >
      <div className="mx-auto px-8 py-4 md:p-8 md:px-10">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium">
              <Image src={"/logo.png"} alt="Logo" width={30} height={30} />
            </div>
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
