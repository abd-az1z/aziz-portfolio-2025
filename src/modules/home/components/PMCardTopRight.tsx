"use client";

import Marquee from "@/components/Marquee";
import { TextLoop } from "@/components/motion-primitives/text-loop";
import { useState } from "react";

type Quote = {
  text: string;
  author: string;
};

const quotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Programming isn't about what you know; it's about creating what you can imagine.",
    author: "Brendan Eich"
  },
  {
    text: "The most disastrous thing that you can ever learn is your first programming language.",
    author: "Alan Kay"
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  }
];

// No props needed for this component
type PMCardTopRightProps = Record<string, never>;

export const PMCardTopRight = ({}: PMCardTopRightProps) => {
  const [, setCurrentQuoteIndex] = useState(0);

  return (
  <div
    className="shadow-[inset_0_0_60px_rgba(255,255,255,0.08)] 
      group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
      hover:[box-shadow:inset_0_0_80px_rgba(255,255,255,0.12)]
      transform-gpu
      col-span-6 md:col-span-3 lg:col-span-2 md:row-span-2 max-md:min-h-[35rem] bg-black
    "
  >
    <div className="flex items-center flex-col p-4 justify-between h-full py-10">
      <h3 className="w-full bg-linear-to-b from-[#DAD4E7] to-[#CB7CCB] bg-clip-text px-4 text-center text-3xl leading-[100%] font-bold tracking-tighter text-transparent select-none dark:from-[#edeffd]">
        Passionate about cutting-edge technologies
      </h3>
      <Marquee />
      <div className="px-4 w-full">
        <TextLoop 
          interval={5}
          onIndexChange={setCurrentQuoteIndex}
          className="block w-full"
        >
          {quotes.map((quote, index) => (
            <blockquote key={index} className="italic text-wrap text-zinc-300 border-l-2 border-pink-400 pl-4 py-2">
              &ldquo;{quote.text}&rdquo;
              <footer className="mt-1 text-sm text-zinc-400">— {quote.author}</footer>
            </blockquote>
          ))}
        </TextLoop>
      </div>
    </div>
  </div>
  );
}
export default PMCardTopRight;