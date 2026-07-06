import HeroSection from "./ui/HeroSection";
import StatsBar from "./ui/StatsBar";
import WorkExperience from "./ui/WorkExperience";
import CaseStudies from "./ui/CaseStudies";
import SideProjects from "./ui/SideProjects";
import TechStack from "./ui/TechStack";
import ContactCTA from "./ui/ContactCTA";
import { FadeIn } from "@/components/ui/fade-in";

const HomeView = () => {
  return (
    <div className="relative w-full bg-background">
      <main className="relative md:mt-16 mt-8 z-0">
        <HeroSection />
        <StatsBar />
        <FadeIn><WorkExperience /></FadeIn>
        <FadeIn delay={0.05}><CaseStudies /></FadeIn>
        <FadeIn delay={0.05}><SideProjects /></FadeIn>
        <FadeIn delay={0.05}><TechStack /></FadeIn>
        <FadeIn delay={0.05}><ContactCTA /></FadeIn>
      </main>
    </div>
  );
};
export default HomeView;
