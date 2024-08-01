
import MinusCircleIcon from '@heroicons/react/20/solid/MinusCircleIcon'
import XIcon from '@heroicons/react/20/solid/XMarkIcon'
import PencilIcon from '@heroicons/react/20/solid/PencilIcon'
import { isObjectEmpty, isFunction} from '../util/tools'
import { getPrimaryTrait } from '../util/medalStore'
import { useDrop } from 'react-dnd'
const MedalPortrait = (props) => {
  const relativePath= import.meta.env.VITE_site_path
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "medal",
        drop: () => ({ name: props.name, position:props.position }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      }))
      const isActive = canDrop && isOver
      const showPrimaryTrait = props.displayPrimary
      let backgroundClass = 'medalPortrait'
      if (isActive) {
        backgroundClass = 'medalPortraitActive'
      } else if (canDrop) {
        backgroundClass = 'medalPortraitDroppable'
      }
    function removeMedal() {
      props.deleteMedal(props.position)
    }
    const showEditLabel = () => {
      return isFunction(props.editMedal)
    }
    function editMedal() {
      props.editMedal(props.position)
    }
    const MedalPrimaryTrait = () => {
      let trait = getPrimaryTrait(props.medal.primary)
      if(!isObjectEmpty(trait))
        return trait.name
      else
        return "<<primary trait is missing>>"
    }
    const medalNameSizeClass = () => {
      let cssClass = ""
      if(!isObjectEmpty(props.medal)) {
        let name = props.medal.name
      
        if(name.length > 18)
          cssClass = "medal-name-xs"
        else if(name.length > 10)
          cssClass = "medal-name-sm"
      }
      

      return cssClass
    }
    return (
        <>
        <div className='flex flex-col'>
          <div className={"flex justify-center items-end min-h-6 z-10 font-bold medal-name " + medalNameSizeClass()}>
              {props.medal.name}
          </div>
          <div ref={drop} className={`flex w-24 h-24 lg:w-28 lg:h-32 justify-center items-center relative cutBottom ${backgroundClass}`}>
                {
                  isObjectEmpty(props.medal) ? 
                  <>
                    <div className="flex justify-center items-center w-20 h-[5.5rem]">
                      <MinusCircleIcon className='icon-medium'/>
                    </div>
                  </> 
                  :
                  <>
                  <div className='flex flex-col'>
                    {showEditLabel() && <XIcon className="flex p-0 cursor-pointer icon-small-grey h-4 translate-y-2 lg:translate-y-0 translate-x-4 place-self-end" onClick={removeMedal} />}
                    <img className="flex place-self-center medal-image" src={`/${relativePath}/medals/${props.medal.image}.png`} />
                    {showEditLabel() && <div className='flex lg:translate-y-[0.1em] h-0 gap-x-2 cursor-pointer' onClick={editMedal}><div className='font-semibold'>Edit</div><PencilIcon className='icon-small-accent' /></div>}
                  </div>
                  </>

                }
          </div>
        </div>
        {
          !isObjectEmpty(props.medal) && showPrimaryTrait && 
          <>
          <div className='flex flex-col items-center'>
            <div className='flex font-bold align-center translate-y-6 z-10'>
                {"Unique Trait"}
              </div>
              <div className='cutTopPrimary h-3/4'>
                {MedalPrimaryTrait()}
              </div>
          </div>
            </>
        }
        </>
    )
}
export default MedalPortrait