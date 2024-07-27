import {useState, useMemo} from 'react'
import { Link } from 'react-router-dom'
import CaretDown from '@heroicons/react/20/solid/ChevronDownIcon'
import CaretUp from '@heroicons/react/20/solid/ChevronUpIcon'
const StyleType = {
    Hover: "hover",
    Collapse: "collapse"
}
const NestedContentList = (props) => {
    const [showChildren, setShowChildren] = useState(false)
    const hasChildren = Array.isArray(props.item.path)
    const isHover =  (props.type == StyleType.Hover)
    const Expander = () => {
        function expand() {
            setShowChildren(!showChildren)
        }
        return (showChildren ? 
            <CaretUp className="icon-medium-grey" onClick={expand} /> : 
            <CaretDown className="icon-medium-grey" onClick={expand} />
        )
    }
    const ListItem = (props) => {
        let item = null;
        return (hasChildren ? 
            <div className="w-full flex flex-row p-2 justify-between"><Link to={props.item.path}>{props.item.name}</Link><Expander /></div>:
            <div className="w-full p-2"><Link onClick={props.clickItem} to={props.item.path}>{props.item.name}</Link></div>
        )
    }
    function emitNavigate(t) {
        props.emitClose()
    }
    // function hoverEvent(e) {
    //     console.log("8=====D ~~" + props.type)
    // }
    return (
        <>
            <div className={"flex flex-col w-full"}>
                <div className={"flex cursor-pointer justify-between py-2 " + (isHover ? "hover": "navCollapse") }>
                    <ListItem clickItem={emitNavigate} item={props.item} />
                </div>
                <div className={"childNode "+ (showChildren && " showSNav")}>
                    {hasChildren && props.item.path.map((ite, i) => <NestedContentList emitClose={props.emitClose} item={ite} key={i} type={isHover ? StyleType.Hover : StyleType.Collapse} />)}
                </div>
                
            </div>
        </>
    )
}
export default NestedContentList