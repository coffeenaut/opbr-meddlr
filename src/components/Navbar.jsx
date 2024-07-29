import {useState} from 'react'
import { Link, useNavigate } from "react-router-dom"
import SearchIcon from "@heroicons/react/20/solid/MagnifyingGlassIcon"
import MenuList from './MenuList'
const Navbar = (props) => {
    const relativePath= import.meta.env.VITE_site_path
    const navigate = useNavigate()
    const [searchput, setSearchput] = useState("") //controlled input for autocomplete
    const items = props.items.map((ite, i) => {
        return (
            // <div>{i.name}</div>
            <MenuList displayChild={false} key={i} item={ite} isParent={true}></MenuList>
        )
    })
    function search() {
        navigate(searchput)
    }
    return (
        <>
            <nav>
                <div className="flex flex-row w-full justify-between">
                    <div className='flex flex-row items-center'>
                        <img className='w-32 p-2' src={`/${relativePath}/meddlrLogo.svg`} />
                        {items}
                    </div>
                    <div className="flex flex-row items-center">
                        {/* <div><input className="rounded-lg w-40 h-8" name="" value={searchput} onChange={e=> setSearchput(e.target.value)}  /></div> */}
                        {/* <div onClick={search}><SearchIcon className='icon-small-grey -translate-x-8'/></div> */}
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar