import {useState} from 'react'
import { Outlet, Link } from "react-router-dom"
import Navbar from '../components/Navbar'
import Overlay from '../components/Overlay'
import MenuIcon from '@heroicons/react/20/solid/Bars3Icon'
import SideBar from '../components/SideBar'
import menuInfo from '../data/routes.json'

const Layout = () => {
  const navInfo = menuInfo
  const [overlayShown, setOverlayShown] = useState(false)
  function toggleOverlay() {
    setOverlayShown(!overlayShown)
  }
  return (
    <>
      <div className='w-full'>
        <div className={"absolute menuoverlay " +  (overlayShown ? "showOverlay" : "hideOverlay")}>
          <Overlay changeOverlay={toggleOverlay}>
            <SideBar items={navInfo} closeBar={toggleOverlay} />
          </Overlay>
        </div>
        <div className='px-2 sticky lg:relative lg:hidden'>
          <MenuIcon onClick={toggleOverlay} className='icon-large-grey cursor-pointer' />
        </div>
        <div className='z-10 px-2 hidden lg:block'>
          <Navbar items={navInfo}/>
        </div>
        <div className="px-2 py-4">
          <Outlet />
        </div>
      </div> 
    </>
  )
};

export default Layout;