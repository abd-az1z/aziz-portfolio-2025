import { HeartHandshake } from "lucide-react";

const style = {
  cardMd: { boxShadow: "inset 0 0 60px rgba(255,255,255,0.08)" },
};

export const PMCardTopLeft = () => (
  <div
    style={style.cardMd}
    className="
      group border-white border p-6 relative flex size-full flex-col justify-between overflow-hidden rounded-xl
      hover:[box-shadow:inset_0_0_100px_rgba(255,255,255,0.12)]
      transform-gpu
      col-span-6 md:col-span-3 lg:col-span-4 max-md:h-[21rem] bg-black
    "
  >
    <div
      className="relative flex items-center h-1/2 rounded-xl overflow-hidden"
      style={{
        backgroundImage: `url('./images/card1.jpg')`,
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
        <p className="mt-1 text-sm font-semibold text-zinc-400">
          I share progress openly, adapt quickly, and keep roadmaps aligned
          with team goals.
        </p>
      </div>
    </div>
  </div>
);
