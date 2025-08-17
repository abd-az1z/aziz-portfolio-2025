import Image from "next/image";
import logo from "../../../public/logo.png";
import NavbarItems from "./NavbarItems";
import { Command } from "lucide-react";

const Header = () => {
  return (
    <div className="flex relative items-center md:px-20 justify-between w-full md:p-10 p-4">
      <div className="flex ">
        <Image width={40} height={40} src={logo} alt="Abdul Aziz" />
      </div>
      <div className="">
        <NavbarItems />
      </div>
      <div>
        <Command className="text-white size-6" />
      </div>
    </div>
  );
};
export default Header;
