import Card from "../components/Card"
import Sprite from '../components/Sprte'
import LightPole from '../assets/lightpole.min.svg'
import Relogo from "../animations/Relogo"
const Animations = (props) => {
    const animations = []
    const paginator = [...Array(9)].map((x, i) => {
        return (
            <>
                <div className='flex'>penis</div>
            </>
        )
    })
    return (
        <>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
            <Card>
                <Sprite sid="light" />
            </Card>
            </div>
            <Card>
                <svg className="my-svg" width="100" height="100" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="100" height="100" fill="blue" />
                </svg>                      
            </Card>
            
        </div>
        </>
    )
}
export default Animations