import NestedContentList from './NestedContentList'

const SideBar = (props) => {
    const items = props.items.map((item, i) => {
        return (
            <NestedContentList emitClose={closeSideBar} item={item} key={i} type="collapse" isParent={true}></NestedContentList>
        )
    });
    function closeSideBar() {
        props.closeBar()
    }
    return (
        <>
            <div className="flex w-full shadow-md gap-x-4 p-2">
            <div className="flex w-full flex-col">
               {items}
            </div>
            {props.children}
            </div>
    </>
    )
}

export default SideBar