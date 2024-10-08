import { Link } from 'react-router-dom'
import Closer from './Closer'

const Overlay = (props) => {
    const relativePath= import.meta.env.VITE_site_path
    return (
        <>
            <div className="sideMenuOverlay z-30 w-3/4 md:w-1/2 p-2 h-screen fixed ">
                <div className="flex justify-between">
                        <Link onClick={props.changeOverlay} to="/"><img className="logo-mcoin" src={`/${relativePath}/mCoin.svg`} /></Link>
                    
                    <div>
                        <Closer closeClick={props.changeOverlay} lassName="cursor-pointer icon-medium-grey" />
                    </div>
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        <div className="overlay-screen">
        </div>
    </>
    )
}

export default Overlay