import React from "react";
import { PMCardTopLeft } from "../components/PMCardTopLeft";
import { PMCardTopRight } from "../components/PMCardTopRight";
import { PMCardMiddleLeft } from "../components/PMCardMiddleLeft";
import { PMCardBottomLeft } from "../components/PMCardBottomLeft";
import { PMCardBottomRight } from "../components/PMCardBottomRight";

const PortfolioMosaic = () => (
  <div className="w-full max-w-7xl grid grid-cols-6 gap-4 px-4 sm:px-6 lg:px-8 lg:max-w-7xl mx-auto md:max-w-full md:auto-rows-[19rem] ">
    {/* Top Left Card */}
    <PMCardTopLeft />
    
    {/* Top Right Card */}
    <PMCardTopRight />
    
    {/* Middle Left Card */}
    <PMCardMiddleLeft />
    
    {/* Bottom Left Card */}
    <PMCardBottomLeft />
    
    {/* Bottom Right Card */}
    <PMCardBottomRight />
  </div>
);

export default PortfolioMosaic;