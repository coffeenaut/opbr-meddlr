import { useState } from "react"
import MedalStack from "./MedalStack"

const MiniMedalSet = (props) => {
    const setName = props.name
    const medals = props.medals
    const [hovered, setHovered] = useState(false)
    return (
        <>
            <div className="flex justify-center text-primary cursor-pointer" 
                onMouseEnter={() => setHovered(true)} 
                onMouseLeave={() => setHovered(false)}
                onClick={() => props.emitLoad(medals, setName)} >{setName}</div>
            <div className={`flex justify-evenly cutBottomSecondary ${hovered ? "focus-hover" : ""}`}>
            {
                medals.length > 0 && medals.map((m,i) => {
                    return <MedalStack medal={m} key={i} showName={false} />
                })
            }
            </div>
            <div className="flex -translate-y-8 justify-center font-bold cursor-pointer" onClick={() => props.deleteSet(setName)}>Delete</div>
        </>
    )
}
export default MiniMedalSet