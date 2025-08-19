import { Quote } from "../ui/PortfolioMosaic";
import Marquee from "@/components/Marquee";

const style = {
  cardMd: { boxShadow: "inset 0 0 60px rgba(255,255,255,0.08)" },
};

type PMCardTopRightProps = {
  quote: Quote;
};

export const PMCardTopRight = ({ quote }: PMCardTopRightProps) => (
  <div
    style={style.cardMd}
    className="
      group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
      hover:[box-shadow:inset_0_0_80px_rgba(255,255,255,0.12)]
      transform-gpu
      col-span-6 md:col-span-3 lg:col-span-2 md:row-span-2 max-md:min-h-[35rem]
    "
  >
    <div className="flex items-center flex-col p-4 justify-between h-full py-10">
      <h3 className="w-full bg-linear-to-b from-[#DAD4E7] to-[#CB7CCB] bg-clip-text px-4 text-center text-3xl leading-[100%] font-bold tracking-tighter text-transparent select-none dark:from-[#edeffd]">
        Passionate about cutting-edge technologies
      </h3>
      <Marquee />
      <blockquote className=" px-4 italic text-zinc-300 border-l-2 border-pink-400 pl-4">
        &ldquo;{quote.text}&rdquo;
        <footer className="mt-1 text-sm text-zinc-400">— {quote.author}</footer>
      </blockquote>
    </div>
  </div>
);
