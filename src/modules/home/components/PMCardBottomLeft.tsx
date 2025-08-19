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
  </div>
);
