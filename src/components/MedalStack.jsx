import MinusCircleIcon from "@heroicons/react/20/solid/MinusCircleIcon"
import { isObjectEmpty } from "../util/tools"

const MedalStack = (props) => {
    const relativePath = import.meta.env.VITE_site_path
    const medal = props.medal
    const displayName = props.showName == undefined ? true : props.showName
    const medalNameSizeClass = () => {
        let name = props.medal.name
        let cssClass = ""
        if(name.length > 18)
          cssClass = "medal-name-xs"
        else if(name.length > 10)
          cssClass = "medal-name-sm"
  
        return cssClass
      }
    return (
        <>
            {
                !isObjectEmpty(medal) ?
                <>
                <div className="flex flex-col">
                    {
                        displayName && 
                        <>
                        <div className={"flex justify-center items-end font-bold medal-name " + medalNameSizeClass()}>
                            {medal.name}
                        </div>
                        </>
                    }
                    
                    <div className="flex justify-center items-center">
                        <img className="flex medal-image" src={`/${relativePath}/${props.medal.image}.png`} />
                    </div>
                </div>
                </>
                :
                <>
                <div className="flex flex-col">
                    <div className="flex items-center blank-line">
                    </div>
                    <div className="flex justify-center items-center medal-empty">
                        <MinusCircleIcon className='icon-medium'/>
                    </div>
                </div>
                </>
            }
        </>
    )
}
export default MedalStack