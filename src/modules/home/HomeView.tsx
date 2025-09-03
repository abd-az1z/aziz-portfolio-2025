import CuratedWork from "./ui/CuratedWork";
import Header from "./ui/Header";
import HeroSection from "./ui/HeroSection";
import PortfolioMosaic from "./ui/PortfolioMosaic";
import RibbonStack from "./ui/RibbonStack";
import KnowAboutMe from "./ui/KnowAboutMe";
import ConceptCreation from "./ui/ConceptCreation";
import Footer from "./ui/Footer";

const HomeView = () => {
  return (
    <div className="relative w-full bg-background">
      <Header />
      <main className="relative md:mt-16 mt-8 z-0">
        <HeroSection />
        <PortfolioMosaic />
        <div className="relative py-20 z-0">
          <CuratedWork />
        </div>
        <RibbonStack />
        <KnowAboutMe />
        <ConceptCreation />
        <Footer />
      </main>
    </div>
  );
};
export default HomeView;
