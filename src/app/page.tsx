import Header from "@/modules/home/Header";
import HeroSection from "@/modules/home/HeroSection";

const Home = () => {
  return (
    <div className="min-h-screen  w-full flex flex-col items-center bg-background px-2 sm:px-4 md:px-8 lg:px-16 transition-all duration-300">
      <div className="w-full">
        <Header />
      </div>
      <div>
        <HeroSection />
      </div>
    </div>
  );
};
export default Home;
