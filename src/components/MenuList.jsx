import {useState, useMemo} from 'react'
import { Link } from 'react-router-dom'
import CaretDown from '@heroicons/react/20/solid/ChevronDownIcon'
import CaretUp from '@heroicons/react/20/solid/ChevronUpIcon'
const MenuList = (props) => {
    const [showChildren, setShowChildren] = useState(false)
    const [hovered, setHovered] = useState(props.displayChild)
    const hasChildren = Array.isArray(props.item.path)
    const parentNode = props.isParent
    function hoverOn(e) {
        setHovered(true)

        if(hasChildren) {
            setShowChildren(true)
        }
    }
    function hoverOff(e) {
        setHovered(false)
        setShowChildren(false)
        
    }
    return (
        <>
            <div onMouseLeave={hoverOff} className="flex flex-col w-full">
                <div onMouseEnter={hoverOn} className="flex flex-col cursor-pointer py-2">
                    <div className={`p-2 ${hovered ? "text-primary font-bold" : ""}`}><Link to={props.item.path}>{props.item.name}</Link></div>
                    <div className={"menu-item-bottom relative w-full " + (hovered ? "item-hover" : "") }></div>
                </div>
                <div child="true" className={"childNode "+ (showChildren ? " showSNav" : "") + (parentNode ? " absolute" : "")}>
                    {hasChildren && props.item.path.map((ite, i) => <MenuList displayChild={showChildren} key={i} item={ite} isParent={false} />)}
                </div>
            </div>
        </>
    )
}
export default MenuList