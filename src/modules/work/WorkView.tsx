import CuratedWork from "./ui/CuratedWork"
import ConceptCreation from "./ui/ConceptCreation"

const WorkView = () => {
  return (
       <div className="relative md:pt-[10vh] w-full bg-background">
         <main className="relative">
            <CuratedWork />
            <ConceptCreation /> 
         </main>
       </div>
  )
}
export default WorkView