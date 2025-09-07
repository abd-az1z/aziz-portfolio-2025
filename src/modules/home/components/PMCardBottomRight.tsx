'use client';

import { useState } from 'react';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider'; 
import { BiCarousel } from "react-icons/bi";

type MiniCard = {
  title: string;
  subtitle?: string;
};

const MINI_CARDS: MiniCard[] = [
  { 
    title: 'AI-Powered\nVideo Calls', 
    subtitle: 'Real-time video\nwith custom AI agents\nusing Stream & OpenAI' 
  },
  { 
    title: 'SaaS Documentation\nAssistant', 
    subtitle: '50% faster document\ncreation with\nAI-guided templates' 
  },
  { 
    title: 'Customer Support\nChatbot', 
    subtitle: '30% faster responses\nwith GPT-3.5\n100+ concurrent chats' 
  },
  { 
    title: 'Full-Stack\nDevelopment', 
    subtitle: 'Next.js, React,\nTypeScript, Tailwind,\nShadCN UI' 
  },
  { 
    title: 'AI & LLM\nExpertise', 
    subtitle: 'OpenAI, LangChain,\nPinecone, RAG,\nPrompt Engineering' 
  },
];

function MiniFeatureCard({ item }: { item: MiniCard }) {
  return (
    <div
      className="
        w-[140px] sm:w-[160px] h-[200px] sm:h-[220px]
        shrink-0 rounded-xl border border-white/10
        bg-white/[0.04] backdrop-blur-[2px]
        shadow-[inset_0_0_24px_rgba(255,255,255,0.06)]
        px-3 py-4
      "
    >
      <div className="space-y-4 leading-10">
        <p className="whitespace-pre-line font-semibold leading-5 text-zinc-100/90">
          {item.title}
        </p>
        {item.subtitle ? (
          <p className="whitespace-pre-line text-sm leading-5  text-zinc-300/60">
            {item.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export const PMCardBottomRight = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [sliderSpeed, setSliderSpeed] = useState(50);

  return (
  <div
    className={`
      relative overflow-hidden rounded-2xl border 
      transition-all duration-300 ease-out
      transform-gpu
      col-span-6 md:col-span-6 lg:col-span-4 max-md:h-[21rem]
      bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0)_30%)]
    `}
    onMouseEnter={() => {
      setIsHovered(true);
      setSliderSpeed(0);
    }}
    onMouseLeave={() => {
      setIsHovered(false);
      setSliderSpeed(50);
    }}
  >
    <div className="relative h-full flex flex-col">
      {/* Scrolling background strip */}
      <div className="relative z-0 flex-grow">
        <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0">
          <InfiniteSlider
            gap={16}
            speed={sliderSpeed}
            speedOnHover={0}
            className="
              mx-auto w-full h-full
              [mask-image:linear-gradient(180deg,transparent,black_10%,black_90%,transparent)]
              px-3 sm:px-4 py-4
            "
          >
            {MINI_CARDS.map((item, i) => (
              <MiniFeatureCard key={`mini-${i}`} item={item} />
            ))}
          </InfiniteSlider>
        </div>
      </div>

      {/* Bottom gradient overlay for legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 sm:h-44 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

      {/* Foreground content (bottom-left label + heading) */}
      <div className="relative transition-all  z-10 p-4 sm:p-5">
      <div className="flex items-center gap-2 text-zinc-300/80">
        {/* Tiny square icon */}
        <span
          aria-hidden
          className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/20 bg-white/5"
        >
          <BiCarousel className='size-6' />
        </span>
        <span className="font-medium tracking-wide">The Inside Scoop</span>
      </div>

      <div className="relative">
        <h3 className="mt-2 sm:text-lg font-semibold text-zinc-100 transition-transform duration-300">
          Currently building a Saas Application
        </h3>
      </div>
    </div>
  </div>
  </div>
  );
};
