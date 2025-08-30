import { Button } from "@/components/ui/button";

const style = {
  cardSm: { boxShadow: "inset 0 0 40px rgba(255,255,255,0.06)" },
};

export const PMCardBottomLeft = () => (
  <div
    style={style.cardSm}
    className="
      group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
      hover:[box-shadow:inset_0_0_70px_rgba(255,255,255,0.12)]
      transform-gpu
      col-span-6 md:col-span-3 lg:col-span-2 max-md:h-[19rem]
    "
  >
    {/* Content for bottom left card */}
    <div className="w-full h-full flex flex-col items-center justify-evenly p-5 ">
      <div className="rounded-full overflow-hidden w-20 h-20 border p-3">
        <img src="./images/logo.png" alt="abdul aziz" />
      </div>
      <h2 className="text-2xl text-center font-extrabold">
        Let&apos;s work together on your next project
      </h2>
      <Button>Github</Button>
    </div>
  </div>
);
