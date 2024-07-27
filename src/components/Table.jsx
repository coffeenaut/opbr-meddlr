import EditIcon from '@heroicons/react/20/solid/PencilSquareIcon'
import DeleteIcon from '@heroicons/react/20/solid/TrashIcon'
import { useActionData } from 'react-router-dom'
const Table = (props) => {
    const fields = props.fields
    const includeActions = props.useActions
    const columnClass = (includeActions.length > 0 ? `grid-cols-${fields.length + 2}`: `grid-cols-${fields.length + 1}`)
    const tableHeader = fields.map(field => {
        return (
            <>
            <div className="mx-1 font-bold">{field}</div>
            </>
        )
    })
    const TableRow = (props) => {
        const items = props.items
        const alternate = props.index % 2 == 0
        const renderRow = items.map((item,i) => {
                return (
                    <>
                    {(includeActions.indexOf("item") > -1 ? <div id={`${item}-${props.index}`} className="cursor-pointer mx-1" onClick={props.ClickItem}>{item}</div> : <div className='mx-1'>{item}</div>)}
                    </>
                )
        })
        return (
            <>
                <div id={props.index} className={`grid ${columnClass} text-xl rounded-md py-4 gap-x-2 ${(alternate ? " alternate1" : " alternate2")}`}>
                    { renderRow }
                    {props.children}
                </div>
            </>
        )
    }
    const ItemView = (e) => {
        props.ItemClick(e.target.id)
    }
    const rows = props.items.map((item,i) => {
        let trow = ""
        const EditAction = () => {
            return (<EditIcon className='icon-medium-grey cursor-pointer' id={`${item}-${i}`} onClick={props.EditItem}/>)
        }
        const DeleteAction = () => {
            return (<DeleteIcon className='icon-medium-grey cursor-pointer' id={`${item}-${i}`} onClick={props.DeleteItem}/>)
        }
        if(Array.isArray(item)) {
            // item.map((ite, ii) => {
                trow = 
                <>
                <TableRow items={item} index={i} key={i} ClickItem={ItemView}>
                    {includeActions ? 
                    <>
                        <div className="flex flex-row gap-x-4">
                                {( includeActions.indexOf("edit") > -1 ? <EditAction /> : "" )}
                                {( includeActions.indexOf("delete") > -1 ?  <DeleteAction /> : "")}
                        </div>
                    </>
                    : ""
                    }
                </TableRow>
                </>
            // })
        }
        return trow
    })
    return (
        <>
        <div className="flex flex-col w-full">
            <div className={`grid ${columnClass} gap-x-2 text-xl`}>
                {tableHeader}
                {includeActions.length > 0 ? <div className="mx-1 font-bold">actions</div> : ""}
            </div>
            {rows}
        </div>
        </>
    )
}
Table.defaultProps = {
    useActions: []
}
export default Table