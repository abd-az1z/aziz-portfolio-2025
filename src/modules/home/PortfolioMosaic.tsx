import { HeartHandshake } from "lucide-react";
import React from "react";
import { Marquee } from "../../components/Marquee";

const style: Record<string, React.CSSProperties> = {
  cardSm: { boxShadow: "inset 0 0 40px rgba(255,255,255,0.06)" },
  cardMd: { boxShadow: "inset 0 0 60px rgba(255,255,255,0.08)" },
  cardLg: { boxShadow: "inset 0 0 80px rgba(255,255,255,0.10)" },
};

export const PortfolioMosaic = () => {
  return (
    <div className="w-full max-w-7xl grid grid-cols-6 gap-4 px-4 sm:px-6 lg:px-8 py-16 md:pt-32 md:pb-24 md:max-w-full md:auto-rows-[19rem] mb-20 md:my-20">
      {/* Card 1 */}
      <div
        style={style.cardMd}
        className="
          group border-white border p-6 relative flex size-full flex-col justify-between overflow-hidden rounded-xl
          hover:[box-shadow:inset_0_0_100px_rgba(255,255,255,0.12)]
          transform-gpu
          col-span-6 md:col-span-3 lg:col-span-4 max-md:h-[21rem]
        "
      >
        <div
          className="relative flex items-center h-1/2 rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url('/card1.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex items-center gap-5">
          <div className="text-pink-300">
            <HeartHandshake className="size-10" />
            <span className="font-medium capitalize md:text-2xl md:mt-2 tracking-wide">
              Open for Collaboration
            </span>
            <h3 className="mt-2 text-lg font-semibold text-zinc-100">
              Building with focus and transparency
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              I share progress openly, adapt quickly, and keep roadmaps aligned
              with team goals.
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div
        style={style.cardMd}
        className="
          group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
          hover:[box-shadow:inset_0_0_80px_rgba(255,255,255,0.12)]
          transform-gpu
          col-span-6 md:col-span-3 lg:col-span-2 md:row-span-2 max-md:min-h-[35rem]
        "
      >
        
        <div className="size-full">
          <h3 className="absolute top-10 w-full bg-linear-to-b from-[#ffffffae] to-[#5f378c] bg-clip-text px-4 text-center text-3xl leading-[100%] font-bold tracking-tighter text-transparent select-none dark:from-[#edeffd]">
            Passionate about cutting-edge technologies
          </h3>
        </div>
        <div>
            {/* marquee */}
            {/* <Marquee/> */}
        </div>
        <div></div>
      </div>

      {/* Card 3 */}
      <div
        style={style.cardLg}
        className="
          group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
          hover:[box-shadow:inset_0_0_100px_rgba(255,255,255,0.14)]
          transform-gpu
          col-span-6 md:col-span-3 lg:col-span-2 md:row-span-2 max-md:h-[32rem]
        "
      />

      {/* Card 4 */}
      <div
        style={style.cardSm}
        className="
          group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
          hover:[box-shadow:inset_0_0_70px_rgba(255,255,255,0.12)]
          transform-gpu
          col-span-6 md:col-span-3 lg:col-span-2 max-md:h-[19rem]
        "
      />

      {/* Card 5 */}
      <div
        style={style.cardMd}
        className="
          group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
          hover:[box-shadow:inset_0_0_90px_rgba(255,255,255,0.12)]
          transform-gpu
          col-span-6 md:col-span-6 lg:col-span-4 max-md:h-[21rem]
        "
      />
    </div>
  );
};
