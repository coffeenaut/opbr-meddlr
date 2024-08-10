import { useSearchParams } from "react-router-dom"
import { isObjectEmpty, DiceRoll, HexToInt } from "../util/tools"
import { GetMedal, getExtraTrait, GetMappedTraitFromKey } from "../util/medalStore"
import PhotoIcon from '@heroicons/react/20/solid/PhotoIcon'
import XIcon from "@heroicons/react/20/solid/XMarkIcon"
import { useState } from "react"
import TraitList from '../components/TraitList'
import MedalStack from "../components/MedalStack"
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
const ViewSet = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [showSideLeft, setShowSideLeft]= useState(false)
    const [showFocusDrop, setShowFocusDrop]= useState(false)
    const [setImage, setSetImage] = useState("")
    const [cardImage, setCardImage] = useState("")
    const qMedals = searchParams.get("medals")
    const qTraits = searchParams.get("t")
    // const traits2 = searchParams.get("t2")
    // const traits3 = searchParams.get("t3")
    const parsedMedals = parseMedalQuery(qMedals)
    const setMedals = (parsed) => {
        let tempMeds = []
        for(let i = 0; i < parsed.length; i++) {
            let medal = GetMedal(parsed[i])
            if(medal) {
                let traits = []
                let traitValues = []
                //generate extra traits
                let start = 0
                let stop = qTraits.length
                if(i == 0) {
                    start = 0
                    stop = 6
                }
                else if ( i == 1) {
                    start = 6
                    stop = 12
                }
                else {
                    start = 12
                    stop = 18
                }
                while (start < stop) {
                    if(start + 1 < qTraits.length) {
                        const tParse = qTraits[start] + qTraits[start+1]
                        const t = GetMappedTraitFromKey(tParse)
                        if(!isObjectEmpty(t)) {
                            traits.push(t.tindex)
                            traitValues.push(t.val)
                        }
                        else {
                            const gTrait = generateRandomTrait(medal)
                            traits.push(gTrait.tindex)
                            traitValues.push(gTrait.val)
                        }

                    }
                    start = start + 2
                }
                medal.set_traits = traits
                medal.set_traits_values = traitValues
                tempMeds.push(medal)
            }
            
        }
        return tempMeds
    }
    function generateRandomTrait(med) {
        const roll = DiceRoll(2)
        const traitId = med.extra_traits[roll]
        const eTrait = getExtraTrait(traitId)
        return {tindex: roll, val: eTrait.max}
    }
    let medals = setMedals(parsedMedals)
    function parseMedalQuery(query) {
        const medals = []
        const splitter = query.split('g')
        if (splitter.length < 2) {
            //invalid
        }
        else
            for(let split of splitter) {
                let deconvert = HexToInt(split)
                if(deconvert > 999) {//event medals
                    deconvert = `e${deconvert - 1000}`
                }
                medals.push(deconvert)
        }
        return medals
    }
    function toggleSideMenu() {
        setShowFocusDrop(!showFocusDrop)
    setShowSideLeft(!showSideLeft)
    }
    async function toggleFocusDrop() {
    setShowFocusDrop(!showFocusDrop)
    setSetImage(await getImageSet())
    setCardImage(await getImageCard())
    }
    async function getImageSet() {
        let dlhref = ""
        dlhref = htmlToImage.toPng(document.getElementById('medal-set'))
        .then(function (dataUrl) {
            console.log(dataUrl)
            return dataUrl
        })
        .catch(function (error) {
            return null
        });
        return dlhref
    }
    async function getImageCard() {
        let dlhref = ""
        dlhref = htmlToImage.toPng(document.getElementById('medal-set-card'))
        .then(function (dataUrl) {
            console.log(dataUrl)
            return dataUrl
        })
        .catch(function (error) {
            return null
        });
        return dlhref
    }
    return (
        <>
        {
        medals.length > 0 ?
        <div className="flex flex-col items-end">
            <div className='z-10 side-icon-tab'>
                <PhotoIcon className='sidecon' onClick={toggleFocusDrop}/>
            </div>
            <div className={`flex fixed flex-col items-end focus-dropdown ${showFocusDrop && "drop-appear"}`}>
                <div className='flex w-full justify-between'>
                    <div>
                        <a className="text-sm button-primary" href={setImage} download>Stack</a>
                    </div>
                    <div>
                        <a className="text-sm button-primary" href={cardImage} download>Card</a>
                    </div>
                    <XIcon className='cursor-pointer -translate-y-2 icon-small-grey' onClick={(e) => {
                    toggleFocusDrop()
                    e.currentTarget.classList.remove("flash-slow")
                    }
                    }/>
                </div>
          </div>
          <div id="medal-set-card" className="flex flex-col md:flew-row place-self-center items-center">
            <div id="medal-set" className="flex w-full md:w-1/2 justify-evenly cutTopPrimary">
            {
                medals.length > 0 && medals.map((m,i) => {
                    return <MedalStack medal={m} key={i} />
                })
            }
            </div>
            <div className="flex flex-col md:flex-row items-center">
                <TraitList medals={medals}/>
            </div>
        </div>
        </div>
        :
        <div className="flex justify-center cutTopPrimary">
        medal query is invalid
        </div>
        }
        </>
    )
}
export default ViewSet