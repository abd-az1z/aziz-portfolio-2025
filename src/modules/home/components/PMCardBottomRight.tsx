const style = {
  cardMd: { boxShadow: "inset 0 0 60px rgba(255,255,255,0.08)" },
};

export const PMCardBottomRight = () => (
  <div
    style={style.cardMd}
    className="
      group border relative flex size-full flex-col justify-between overflow-hidden rounded-xl
      hover:[box-shadow:inset_0_0_90px_rgba(255,255,255,0.12)]
      transform-gpu
      col-span-6 md:col-span-6 lg:col-span-4 max-md:h-[21rem]
    "
  >
    {/* Content for bottom right card */}
  </div>
);
