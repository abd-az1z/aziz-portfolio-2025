import { CuratedWork } from "./ui/CuratedWork";
import Header from "./ui/Header";
import HeroSection from "./ui/HeroSection";
import PortfolioMosaic from "./ui/PortfolioMosaic";
import TechStackSection from "./ui/TechStackSection";

const HomeView = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
      <main className="py-16 ">
        <HeroSection />
        <PortfolioMosaic />
        <CuratedWork />
        <TechStackSection />
      </main>
    </div>
  );
};
export default HomeView;
