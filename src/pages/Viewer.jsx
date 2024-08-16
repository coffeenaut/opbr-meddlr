import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect'
import MedalView from "../components/MedalView";
import MedalPortrait from '../components/MedalPortrait'; 
import { lazy, useState, Suspense } from 'react';
import Spinner from '../components/Spinner';
const  MedalList = lazy(() => import ("../components/MedalList"))
import { isObjectEmpty } from '../util/tools';
const Viewer = () => {
    const [selectedMedal, setSelectedMedal] = useState({})
    const [isMedalViewed, setIsMedalViewed] = useState(false) 
    const closeWindow = false
    const updateMedal = {}
    const setMedal = (medal, target) => {
        if(isMedalValid(medal.id)){
            // setTraitsActive(true)
            setSelectedMedal({...medal})
            setIsMedalViewed(true)
        }
        else
            console.log("medal already exists in set")
    }
    function isMedalValid(id) {
        return true
    }
    return (
        <>
            <Suspense fallback={Spinner}>
                <div className="flex flex-col justify-between md:flex-row justify-evenly gap-x-4">
                <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                <div className={`flex flex-col cutTop items-center md:w-1/2 medal-viewbox ${isMedalViewed ? "expand-box" : ""}`}>
                    <div className='flex'>
                        <div className='flex items-center gap-2'>
                            <MedalPortrait editMedal={updateMedal} displayPrimary={true} deleteMedal={closeWindow} position={0} medal={selectedMedal}></MedalPortrait>
                        </div>
                    </div>
                    <MedalView edit={false} medal={selectedMedal} closeWindow={closeWindow}></MedalView>
                </div>
                    <div className="lg:w-1/2 max-h-[400px] md:max-h-[650px] lg:max-h-[700px] overflow-y-auto">
                        <Suspense fallback={<Spinner />}>
                            <MedalList dropped={setMedal}></MedalList>
                        </Suspense>
                        
                    </div>
                </DndProvider>
                    
                </div>
            </Suspense>
        </>
    )
}
export default Viewer