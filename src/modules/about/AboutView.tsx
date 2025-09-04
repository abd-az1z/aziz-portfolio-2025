import ConceptCreation from "./ui/ConceptCreation"
import KnowAboutMe from "./ui/KnowAboutMe"

const AboutView = () => {
  return (
    <div className="relative w-full bg-background">
      <main className="relative">
        <KnowAboutMe />
        <ConceptCreation />
      </main>
    </div>
  )
}
export default AboutView