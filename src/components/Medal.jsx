import { useDrag } from "react-dnd"
import { DiceRoll } from "../util/tools"
import ExtraTraits from '../data/output/extraTraits2.json'
import { getExtraTrait } from "../util/medalStore"
const Medal = (props) => {
  const relativePath = import.meta.env.VITE_site_path
    const medal = props.medal
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "medal",
        item: { medal },
        end: (item, monitor) => {
          const dropResult = monitor.getDropResult()
          if (item && dropResult) {
            //generate medal extra traits
            let traits = []
            let values = []
            for(let i=0; i<3; i++) {
              let gendTrait = DiceRoll(2, 0)
              let traitId = item.medal.extra_traits[gendTrait]
              let theTrait = getExtraTrait(traitId)
              // let tempTrait = theTrait.name.replace('X%', `${theTrait.max}%`)
              traits.push(gendTrait)
              values.push(theTrait.max)
            }
            let mint = item.medal
            mint.set_traits = traits
            mint.set_traits_values = values
            props.onDrop(mint, dropResult)
          }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
      }))
      const opacity = isDragging && "dragging"
    return (<img ref={drag} className={`medal-image rounded-full ${opacity}`} src={`/${relativePath}/medals/${medal.image}.png`} title={medal.name} /> )
}
export default Medal