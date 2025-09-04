"use client";

import FlipPhoto from "../components/FlipPhoto";
import KnowMoreContent from "../components/KnowMoreContent";

export default function KnowAboutMe() {
  return (
    <div className="w-full max-w-7xl md:mt-[10vh] gap-4 px-4 sm:px-6 lg:px-8 lg:max-w-7xl mx-auto md:max-w-full">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.9fr]">
        <KnowMoreContent />

        <div className="mx-auto lg:justify-self-end">
          <FlipPhoto
            frontSrc="/images/me.png"          
            backSrc="/images/logo-2.png"  
            size={360}
            rounded="rounded-[28px]"
          />
        </div>
      </div>
    </div>
  );
}