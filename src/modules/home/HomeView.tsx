import Header from "./ui/Header";
import HeroSection from "./ui/HeroSection";
import PortfolioMosaic from "./ui/PortfolioMosaic";

const HomeView = () => {
  return (
    <div className="min-h-screen w-full bg-background">

      <Header />
      <main className="pt-16">
        <HeroSection />
        <PortfolioMosaic />
      </main>
    </div>
  );
};
export default HomeView;
