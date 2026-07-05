"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

interface CountUpProps {
  to: number;
  start: boolean;
  suffix?: string;
}

const CountUp = ({ to, start, suffix = "" }: CountUpProps) => {
  const [value, setValue] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, to, reduceMotion]);

  return (
    <span>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="border-y border-border bg-surface px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-4xl font-semibold text-foreground md:text-5xl">
            <CountUp to={50} start={isInView} suffix="+" />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            PRs merged to production
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-4xl font-semibold text-foreground md:text-5xl">
            <CountUp to={3} start={isInView} />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Critical security fixes
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="whitespace-nowrap font-mono text-2xl font-semibold text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            <CountUp to={6200} start={isInView} />
            <span className="mx-1 text-muted-foreground">→</span>
            <CountUp to={109} start={isInView} />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Lines refactored to entry point
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-mono text-4xl font-semibold text-foreground md:text-5xl">
            <CountUp to={5} start={isInView} />
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            POS integrations shipped
          </span>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
