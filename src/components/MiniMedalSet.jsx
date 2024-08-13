import { useState } from "react"
import MedalStack from "./MedalStack"
import { isFunction } from "../util/tools"

const MiniMedalSet = (props) => {
    const setName = props.name
    const medals = props.medals
    const showDelete = isFunction(props.deleteSet)
    const [hovered, setHovered] = useState(false)
    return (
        <>
            <div className="flex justify-center text-primary" 
                onMouseEnter={() => setHovered(true)} 
                onMouseLeave={() => setHovered(false)}
                >{setName}</div>
            <div className={`flex justify-evenly cutBottomSecondary cursor-pointer ${hovered ? "focus-hover" : ""}`} onClick={() => props.emitLoad(medals, setName)}>
            {
                medals.length > 0 && medals.map((m,i) => {
                    return <MedalStack medal={m} key={i} showName={false} />
                })
            }
            </div>
            {
                showDelete && <div className="flex -translate-y-8 justify-center font-bold cursor-pointer z-10" onClick={() => props.deleteSet(setName)}>Delete</div>
            }
        </>
    )
}
export default MiniMedalSet