import { ChevronRight } from "lucide-react";
import worldmap from "../../../public/worldmap.jpg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col text-[#F5F5F5]/70 items-center">
      <div className=" border  bg-[#2B2A2B] mt-10  tracking-wide  border-[#373637] px-1.5 rounded-full py-1 text-sm font-light flex items-center gap-x-1 ">
        <p className="px-2 font-medium text-sm bg-blue-600 rounded-full">New</p>
        <p className="font-medium">Project is coming soon</p>
        <ChevronRight className="size-4" />
      </div>
      <div className="py-10">
        <h1 className="text-6xl leading-20 text-center font-bold text-white">
          I help founders turn ideas <br />
          into seamless{" "}
          <span
            className="tracking-wider "
            style={{ fontFamily: "NyghtSerif" }}
          >
            digital experiences
          </span>
        </h1>
      </div>
      <div className="flex text items-center gap-x-3">
        <p className="text-2xl">Hello, I&apos;m Abdul Aziz</p>
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            className="object-cover w-full h-full"
            src={worldmap}
            alt="worldmap"
          />
        </div>
        <p className="text-2xl">a Full Stack Developer </p>
      </div>
    </div>
  );
};
export default HeroSection;
