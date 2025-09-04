import RibbonStackBg from "../components/RibbonStackBg"
import RibbonStackFront from "../components/RibbonStackFront"

const RibbonStack = () => {
  return (
    <div className="relative sm:h-[20rem] h-[40rem] w-full flex items-center justify-center">
      <div className="w-full">
        <div className="relative h-full w-full">
          <RibbonStackFront className="z-10" />
          <RibbonStackBg className="z-0" />
        </div>
      </div>
    </div>
  )
}
export default RibbonStack