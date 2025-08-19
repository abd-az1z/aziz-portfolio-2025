const style = {
  cardLg: { boxShadow: "inset 0 0 80px rgba(255,255,255,0.10)" },
};

export const PMCardMiddleLeft = () => (
  <div
    style={style.cardLg}
    className="
      group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
      hover:[box-shadow:inset_0_0_100px_rgba(255,255,255,0.14)]
      transform-gpu
      col-span-6 md:col-span-3 lg:col-span-2 md:row-span-2 max-md:h-[32rem]
    "
  >
    {/* Content for middle left card */}
  </div>
);
