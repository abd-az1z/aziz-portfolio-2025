"use client";

import Link from "next/link";
import { LuLinkedin, LuGithub,LuInstagram } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";
import {
  Mail,
  Phone,
  MapPin,
  CopyrightIcon,
} from "lucide-react";

// Reusable underline animation component
const AnimatedLink = ({ children, href, className = "", prefetch = false, ...props }) => (
  <div className="relative group">
    <Link
      href={href}
      className={`${className} relative inline-block`}
      prefetch={prefetch}
      {...props}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const QUICK_LINKS = [
    { label: "Home", id: "" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Blog", id: "blog" },
  ];

  const SERVICES = [
    "Web Development",
    "UI/UX Design",
    "Mobile Apps",
    "SEO",
  ];

  return (
    <footer className="text-white bg-black py-16 px-4  md:px-8">
      <div className="max-w-7xl border rounded-4xl bg-[#0F0F0F] p-10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Portfolio</h2>
            <p className="text-gray-400">
              A passionate developer creating beautiful and functional web
              experiences.
            </p>
            <div className="flex space-x-2">
              <Link
                href="https://linkedin.com/in/abdul-aziz-87296b179"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <LuLinkedin className="w-5 h-5" />
              </Link>

              <Link
                href="https://github.com/abd-az1z"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <LuGithub className="w-5 h-5" />
              </Link>

              <Link
                href="https://x.com/MdAbdul13067562"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <RiTwitterXLine className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.instagram.com/abdul_azi.z"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <LuInstagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, id }) => (
                <li key={label} className="py-1">
                  <AnimatedLink 
                    href={{ pathname: "/", hash: id }}
                    className="text-gray-200 hover:text-white text-base"
                    prefetch={false}
                  >
                    {label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service} className="py-1">
                  <AnimatedLink 
                    href="#"
                    className="text-gray-200 hover:text-white text-base"
                  >
                    {service}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 text-gray-200">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="group py-1">
                <AnimatedLink 
                  href="mailto:contact@example.com"
                  className="flex items-center space-x-3 text-gray-200 hover:text-white"
                >
                 <div className="flex items-center space-x-3">
                 <Mail className="w-5 text-gray-500 h-5 mb-1 flex-shrink-0" />
                 <span>contact@example.com</span>
                 </div>
                </AnimatedLink>
              </div>
              <div className="group py-1">
                <AnimatedLink 
                  href="tel:+15551234567"
                  className="flex items-center space-x-3 text-gray-200 hover:text-white"
                >
                 <div className="flex items-center space-x-3">
                 <Phone className="w-5 text-gray-500 h-5 mb-1 flex-shrink-0" />
                 <span>+1 (555) 123-4567</span>
                 </div>
                </AnimatedLink>
              </div>
              <div className="group py-1">
                <AnimatedLink 
                  href="https://maps.google.com?q=San+Francisco,+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-200 hover:text-white"
                >
                 <div className="flex items-center space-x-3">
                 <MapPin className="w-5 text-gray-500 h-5 mb-1 flex-shrink-0" />
                 <span>San Francisco, CA</span>
                 </div>
                </AnimatedLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center gap-2">
          <CopyrightIcon className="w-5 h-5" />
          {currentYear} Abdul Aziz. All rights reserved
        </p>
        <div className="flex space-x-6 text-sm">
          <AnimatedLink href="/privacy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </AnimatedLink>
          <AnimatedLink href="/terms" className="text-gray-400 hover:text-white">
            Terms of Service
          </AnimatedLink>
          <AnimatedLink href="/cookies" className="text-gray-400 hover:text-white">
            Cookies
          </AnimatedLink>
        </div>
      </div>
    </footer>
  );
}
