import HeroSection from "./ui/HeroSection";
import StatsBar from "./ui/StatsBar";
import WorkExperience from "./ui/WorkExperience";
import CaseStudies from "./ui/CaseStudies";
import SideProjects from "./ui/SideProjects";
import TechStack from "./ui/TechStack";
import ContactCTA from "./ui/ContactCTA";

const HomeView = () => {
  return (
    <div className="relative w-full bg-background">
      <main className="relative md:mt-16 mt-8 z-0">
        <HeroSection />
        <StatsBar />
        <WorkExperience />
        <CaseStudies />
        <SideProjects />
        <TechStack />
        <ContactCTA />
      </main>
    </div>
  );
};
export default HomeView;
