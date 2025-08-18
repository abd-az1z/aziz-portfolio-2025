import Header from "@/modules/home/Header";
import HeroSection from "@/modules/home/HeroSection";
import { PortfolioMosaic } from "@/modules/home/PortfolioMosaic";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <PortfolioMosaic />
      </main>
    </div>
  );
}
