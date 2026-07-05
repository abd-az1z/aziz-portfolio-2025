import HeroSection from "./ui/HeroSection";
import StatsBar from "./ui/StatsBar";
import WorkExperience from "./ui/WorkExperience";
import CaseStudies from "./ui/CaseStudies";
import SideProjects from "./ui/SideProjects";
import RibbonStack from "./ui/RibbonStack";
import KnowAboutMe from "./ui/KnowAboutMe";
import ConceptCreation from "./ui/ConceptCreation";

const HomeView = () => {
  return (
    <div className="relative w-full bg-background">
      <main className="relative md:mt-16 mt-8 z-0">
        <HeroSection />
        <StatsBar />
        <WorkExperience />
        <CaseStudies />
        <SideProjects />
        <RibbonStack />
        <KnowAboutMe />
        <ConceptCreation />
      </main>
    </div>
  );
};
export default HomeView;
