import { CuratedWork } from "./ui/CuratedWork";
import Header from "./ui/Header";
import HeroSection from "./ui/HeroSection";
import PortfolioMosaic from "./ui/PortfolioMosaic";
import RibbonStack from "./ui/RibbonStack";
import TechStackSection from "./ui/TechStackSection";
import KnowAboutMe from "./ui/KnowAboutMe";

const HomeView = () => {
  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <Header />
      <main className="md:py10 my-16 space-y-16">
        <HeroSection />
        <PortfolioMosaic />
        <CuratedWork />
        <TechStackSection />
        <RibbonStack />
        <KnowAboutMe />
      </main>
    </div>
  );
};
export default HomeView;
