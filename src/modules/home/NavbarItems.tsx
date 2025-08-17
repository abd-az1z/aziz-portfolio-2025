"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "More", href: "/more" },
];

const NavbarItems = () => {
  const [selected, setSelected] = useState("/");

  return (
    <div className="w-full border bg-[#2B2A2B] text-[#F5F5F5]/70 tracking-wide border-[#373637] px-1.5 rounded-full py-1 text-sm font-light flex items-center gap-x-4">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setSelected(link.href)}
          className={
            selected === link.href
              ? "px-3 py-2 bg-[#393839] rounded-full text-[#F5F5F5] transition-all duration-200"
              : "px-3 py-1 rounded-md hover:bg-[#444] transition-all duration-200"
          }
        >
          {link.label}
        </Link>
      ))}
      <Button className="px-3 py-2 font-normal text-[#F5F5F5]/70 bg-gradient-to-t from-[#F5F5F5]/40 to-[#373637] border border-[#373637] rounded-full">
        Book a Call
      </Button>
    </div>
  );
};

export default NavbarItems;
