import MedalPortrait from '../components/MedalPortrait';
import BookmarkIcon from '@heroicons/react/20/solid/BookmarkIcon';
import XMarkIcon from '@heroicons/react/20/solid/XMarkIcon';
import { useState, useRef} from 'react';
import { isObjectEmpty } from '../util/tools';
const MedalSet = (props) => {
    const hasMedals = () => {
        let result = false
        let medals = props.medals;
        for(let medal of medals) {
            if(!isObjectEmpty(medal)) {
                result = true
                break
            }
        }
        return result
    }
    return (
        <>
        <div id="medal-set" className="relative cutBottomPrimary">
            <div className="flex justify-center items-center gap-x-2 gap-y-2 lg:gap-8 lg:px-8 medalInner">
                <MedalPortrait name="Medal1" editMedal={props.modifyMedal} displayPrimary={false} deleteMedal={props.removeMedal} position={0} medal={props.medals[0]}/>
                <MedalPortrait name="Medal2" editMedal={props.modifyMedal} displayPrimary={false} deleteMedal={props.removeMedal} position={1} medal={props.medals[1]}/>
                <MedalPortrait name="Medal3" editMedal={props.modifyMedal} displayPrimary={false} deleteMedal={props.removeMedal} position={2} medal={props.medals[2]}/>
            </div>
            <div className={`flex justify-end items-center cursor-pointer translate-y-8 px-2 font-bold ${hasMedals() ? "" : "hidden"}`} onClick={props.emitSaveDrop}><BookmarkIcon className='bookmark-light'/>Save</div>
        </div>
        </>
    )
}
export default MedalSet