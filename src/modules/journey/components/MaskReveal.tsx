"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/scroll";

interface MaskRevealProps {
  children: ReactNode;
  /** Seconds, staggering siblings within a scene */
  delay?: number;
  className?: string;
}

/**
 * Motion language (Master_PRP §3): text enters via mask/clip reveal —
 * translateY + clip-path — not plain opacity. Instant under
 * prefers-reduced-motion via gsap.matchMedia.
 */
const MaskReveal = ({ children, delay = 0, className = "" }: MaskRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-mask-inner]",
          { y: "110%", clipPath: "inset(0 0 100% 0)" },
          {
            y: "0%",
            clipPath: "inset(0 0 -10% 0)",
            duration: 1,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div data-mask-inner>{children}</div>
    </div>
  );
};

export default MaskReveal;
