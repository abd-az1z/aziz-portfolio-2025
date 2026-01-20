import ProjectsScrollShowcase from "../components/ProjectsScrollShowcase";

const CuratedWork = () => {
  return (
    <div className="w-full max-w-7xl gap-4 px-4 sm:px-6 lg:px-8 lg:max-w-7xl mx-auto md:max-w-full">
      <div className="flex flex-col items-center w-full gap-4">
        <p className="text-zinc-300 font-medium tracking-wide uppercase">
          FEATURED PROJECTS
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight">
          Curated <span className="font-['NyghtSerif']">work</span>
        </h2>
      </div>
      <ProjectsScrollShowcase />
    </div>
  );
};
export default CuratedWork;