import React, { useMemo } from "react";
import { PMCardTopLeft } from "../components/PMCardTopLeft";
import { PMCardTopRight } from "../components/PMCardTopRight";
import { PMCardMiddleLeft } from "../components/PMCardMiddleLeft";
import { PMCardBottomLeft } from "../components/PMCardBottomLeft";
import { PMCardBottomRight } from "../components/PMCardBottomRight";

export type Quote = {
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

const PortfolioMosaic = () => {
  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  return (
    <div className="w-full max-w-7xl grid grid-cols-6 gap-4 px-4 sm:px-6 lg:px-8 lg:max-w-7xl mx-auto py-16 md:pt-32 md:pb-24 md:max-w-full md:auto-rows-[19rem] mb-20 md:my-20">
      {/* Top Left Card */}
      <PMCardTopLeft />
      
      {/* Top Right Card */}
      <PMCardTopRight quote={randomQuote} />
      
      {/* Middle Left Card */}
      <PMCardMiddleLeft />
      
      {/* Bottom Left Card */}
      <PMCardBottomLeft />
      
      {/* Bottom Right Card */}
      <PMCardBottomRight />
    </div>
  );
};

export default PortfolioMosaic;