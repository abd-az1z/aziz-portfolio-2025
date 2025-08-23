"use client";

import React from "react";
import { motion } from "motion/react";
import {
  AnimatedGroup,
  PresetType,
} from "@/components/motion-primitives/animated-group";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaLinux,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiPostgresql,
  SiGithub,
  SiVercel,
  SiClerk,
  SiGraphql,
  SiPostman,
  SiFirebase,
  SiStripe,
  SiOpenai,
  SiJest,
} from "react-icons/si";

const makeRowVariants = (delayChildren = 0, stagger = 0.06) => ({
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren,
        staggerChildren: stagger,
      },
    },
  },
});

type Chip = {
  label: string;
  icon: React.ReactNode;
  href?: string;
};

const ROWS: Chip[][] = [
  [
    { label: "ReactJS", icon: <FaReact className="text-sky-400" /> },
    { label: "NextJS", icon: <SiNextdotjs className="text-white" /> },
    { label: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
    { label: "JavaScript", icon: <SiTypescript className="text-yellow-400" /> },
    { label: "HTML", icon: <SiTypescript className="text-orange-500" /> },
    { label: "CSS", icon: <SiTypescript className="text-blue-400" /> },
    { label: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    { label: "ShadCN UI", icon: <SiFramer className="text-pink-500" /> },
  ],
  [
    { label: "NodeJS", icon: <FaNodeJs className="text-green-500" /> },
    { label: "PostgreSQL", icon: <SiPostgresql className="text-sky-700" /> },
    // { label: "Hasura", icon: <SiPostgresql className="text-purple-500" /> },
    { label: "GraphQL", icon: <SiGraphql className="text-pink-500" /> },
    { label: "REST API", icon: <SiPostman className="text-orange-500" /> },
    { label: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
    { label: "Clerk", icon: <SiClerk className="text-violet-400" /> },
    { label: "Stripe", icon: <SiStripe className="text-purple-600" /> },
    { label: "Inngest", icon: <SiVercel className="text-white" /> },
    { label: "Vercel", icon: <SiVercel className="text-white" /> },
  ],
  [
    { label: "OpenAI GPT", icon: <SiOpenai className="text-green-400" /> },
    { label: "LangChain", icon: <SiOpenai className="text-teal-400" /> },
    { label: "Pinecone", icon: <SiOpenai className="text-lime-400" /> },
    { label: "RAG", icon: <SiOpenai className="text-emerald-400" /> },
    { label: "Git", icon: <FaGitAlt className="text-orange-500" /> },
    { label: "GitHub", icon: <SiGithub className="text-white" /> },
    { label: "Postman", icon: <SiPostman className="text-orange-400" /> },
    { label: "Jest", icon: <SiJest className="text-red-500" /> },
    // { label: "Cypress", icon: <SiCypress className="text-green-500" /> },
    // { label: "Docker", icon: <FaDocker className="text-sky-400" /> },
    // { label: "AWS", icon: <FaAws className="text-yellow-400" /> },
    { label: "Linux", icon: <FaLinux className="text-yellow-500" /> },
  ],
];

// choose any preset from your AnimatedGroup
const CHIP_PRESET: PresetType = "blur-slide";

// how long to wait before each line starts animating
const ROW_DELAYS = [0, 0.55, 1.1]; // seconds

// ----- tiny chip component (with optional link + icon micro-anim)
const ChipView = ({ chip }: { chip: Chip }) => {
  const content = (
    <div className="inline-flex items-center gap-2 rounded-xl border border-zinc-800/70 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-200 shadow-[inset_0_0_30px_rgba(255,255,255,0.06)] transition-transform hover:-translate-y-0.5">
      <motion.span
        whileHover={{ scale: 1.08, rotate: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="grid place-items-center"
      >
        {chip.icon}
      </motion.span>
      {chip.label}
    </div>
  );

  if (chip.href) {
    return (
      <a
        href={chip.href}
        target="_blank"
        rel="noreferrer"
        aria-label={chip.label}
      >
        {content}
      </a>
    );
  }
  return content;
};

// ----- main section
export default function TechStackSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-24 text-center">
      {/* heading */}
      <div className="my-10 flex w-full flex-col items-center gap-2">
        <p className="font-medium uppercase tracking-wide text-zinc-300">
          MY SKILLS
        </p>
        <h2 className="tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Curated{" "}
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-indigo-400 bg-clip-text font-['NyghtSerif'] text-transparent">
            work
          </span>
        </h2>
      </div>

      {/* rows */}
      <div className="space-y-4">
        {ROWS.map((row, i) => (
          <AnimatedGroup
            key={i}
            preset={CHIP_PRESET}
            className="flex flex-wrap items-center justify-center gap-3"
            variants={makeRowVariants(ROW_DELAYS[i], 0.07)}
            as="div"
            asChild="div"
          >
            {row.map((chip) => (
              <ChipView key={chip.label} chip={chip} />
            ))}
          </AnimatedGroup>
        ))}
      </div>

      {/* optional floating flourish */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-56 w-56 rounded-full bg-gradient-to-b from-zinc-100/10 to-transparent blur-3xl"
      />
    </section>
  );
}
