import CuratedWork from "./ui/CuratedWork";
import HeroSection from "./ui/HeroSection";
import PortfolioMosaic from "./ui/PortfolioMosaic";
import RibbonStack from "./ui/RibbonStack";
import KnowAboutMe from "./ui/KnowAboutMe";
import ConceptCreation from "./ui/ConceptCreation";

const HomeView = () => {
  return (
    <div className="relative w-full bg-background">
      <main className="relative md:mt-16 mt-8 z-0">
        <HeroSection />
        <PortfolioMosaic />
        <div className="relative md:py-20 py-10 z-0">
          <CuratedWork />
        </div>
        <RibbonStack />
        <KnowAboutMe />
        <ConceptCreation />
      </main>
    </div>
  );
};
export default HomeView;
