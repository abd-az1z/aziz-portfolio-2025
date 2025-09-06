"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import RINGS from 'vanta/dist/vanta.rings.min';
import { motion, useInView } from 'framer-motion';

interface VantaRingsSettings {
  el: HTMLElement | string;
  THREE: typeof THREE;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  backgroundColor?: number;
  color?: number;
}

type VantaEffect = {
  destroy: () => void;
  setOptions: (settings: Partial<VantaRingsSettings>) => void;
};

export default function ConceptCreation() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffect | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!vantaRef.current || typeof window === 'undefined') return;

    const initVanta = () => {
      if (!vantaEffect.current) {
        vantaEffect.current = RINGS({
          el: vantaRef.current!,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x000000,
          color: 0x6f706e
        });
      }
    };

    initVanta();

    const handleResize = () => {
      if (vantaEffect.current) {
        vantaEffect.current.setOptions({
          minWidth: Math.min(window.innerWidth, 1200),
          minHeight: Math.min(window.innerHeight, 800)
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);


  return (
    <section className="w-full mt-[15vh] gap-4">
      <div ref={vantaRef} className="w-full h-screen relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tl from-black/10 to-black/5">
          <div ref={ref} className="text-center px-4">
            <motion.p 
              className="text-4xl font-extralight sm:text-5xl md:text-6xl lg:text-6xl uppercase text-white mb-6"
              initial={{ opacity: 0, x: -200 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              From concept to creation
            </motion.p>
            <motion.p 
              className="text-4xl font-extralight sm:text-5xl md:text-5xl lg:text-5xl uppercase text-white mb-6"
              initial={{ opacity: 0, x: 200 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Let&apos;s turn it to <span className="font-bold">reality!</span>
            </motion.p>
            <div className="flex flex-col sm:flex-row hover:scale-110 transition-transform items-center justify-center gap-4 py-4 md:py-12">
              <Button size="lg" className="font-semibold rounded-full bg-accent/10 text-white border border-white/25  ">
                Let&apos;s Connect
                <ArrowRight className="p-2 size-8  rounded-full text-black bg-white/80 transition-transform -mr-2 group-hover:translate-x-1" />
              </Button>
            </div>
            <div className='space-y-3'>
              <p className="text-white/80 md:text-4xl font-bold text-2xl">I&apos;m open for all the types of project.</p>
              <p className="w-full bg-linear-to-t from-[#cdcccc] to-[#a8a8a8] bg-clip-text px-4 text-center text-xl text-transparent select-none">I thrive on challenges and love to push my limits for<br />develivering seamless user experience.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
