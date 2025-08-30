"use client";

import Link from "next/link";
import { LuLinkedin, LuGithub } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";

export default function KnowMoreContent() {
  return (
    <section
      aria-labelledby="know-about-me"
      className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:max-w-4xl lg:max-w-5xl"
    >
      <div className="mx-auto text-center md:text-left">
        <p className="text-[10px] tracking-[0.24em] text-zinc-400 sm:text-xs">
          KNOW ABOUT ME
        </p>

        <h1
          id="know-about-me"
          className="mt-3 font-semibold text-zinc-100 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[56px]"
        >
          Full-Stack Developer and a little bit of{" "}
          <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-['NyghtSerif']">
            everything
          </span>
        </h1>

        <div className="mt-5 space-y-4 text-sm sm:text-[15px] leading-7 text-zinc-300">
          <p>
            I’m Abdul Aziz — a full-stack developer and MSITM grad who builds
            production-ready, AI-powered web apps across React, Next.js, and
            Node.js with a focus on performance, security, and clean UX.
          </p>
          <p>
            When I’m not deep in code or refining AI-driven projects, I’m
            exploring fresh ideas and experimenting with emerging technologies.
            Learning feels like play—testing new frameworks or ideating the next
            SaaS—so I balance serious problem-solving with curiosity and
            creativity.
          </p>
        </div>

        {/* socials + CTA */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <nav aria-label="Social links" className="flex items-center gap-4 sm:gap-5">
            <Link
              href="https://www.linkedin.com/in/abdul-aziz-87296b179"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl sm:text-[26px] text-zinc-300 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
            >
              <LuLinkedin />
            </Link>

            <Link
              href="https://github.com/abd-az1z"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl sm:text-[26px] text-zinc-300 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
            >
              <LuGithub />
            </Link>

            <Link
              href="https://x.com/MdAbdul13067562"
              aria-label="X (Twitter)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-2xl sm:text-[26px] text-zinc-300 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
            >
              <RiTwitterXLine />
            </Link>
          </nav>

          <Link
            href="#experience"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700/60 px-4 py-2 text-sm font-medium text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
          >
            Work Experience <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}