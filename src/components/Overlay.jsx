import { Link } from 'react-router-dom'
import CalculatorIcon from '@heroicons/react/20/solid/CalculatorIcon'
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
                <div className='flex justify-end p-2'>
                    <Link onClick={props.changeOverlay} to='/tools/chance'><CalculatorIcon className='cursor-pointer icon-medium' /></Link>
                </div>
            </div>
        <div className="overlay-screen">
        </div>
    </>
    )
}

export default Overlay