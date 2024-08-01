import { useSearchParams } from "react-router-dom"
import { isObjectEmpty, DiceRoll, HexToInt } from "../util/tools"
import { GetMedal, getExtraTrait, GetMappedTraitFromKey } from "../util/medalStore"
import MinusCircleIcon from "@heroicons/react/20/solid/MinusCircleIcon"
import { useState } from "react"
import TraitList from '../components/TraitList'
import MedalStack from "../components/MedalStack"
const ViewSet = () => {
    const [searchParams, setSearchParams] = useSearchParams()
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
                        console.log(tParse, t)
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
                //     if(qTraits.length > 5) {
                //         for(let ii = 0; ii < 5; ii++) {}
                //             let tParser = "" 
                //         const t = GetMappedTraitFromKey(tParser)
                //         if(!isObjectEmpty(t)) {
                //             traits.push(t.tindex)
                //             traitValues.push(t.val)
                //         }
                //         else {
                //             const gTrait = generateRandomTrait(medal)
                //             traits.push(gTrait.tindex)
                //             traitValues.push(gTrait.val)
                //         }
                //     }
                //     else {
                //         const gTrait = generateRandomTrait(medal)
                //         traits.push(gTrait.tindex)
                //         traitValues.push(gTrait.val)
                //     }
                // }
                // else if (i == 1) {
                //     if(traits.length > 11) {
                //         let tParser = qTraits[0] + qTraits[1]
                //         const t2 = GetMappedTraitFromKey(tParser)
                //         if(!isObjectEmpty(t2)) {
                //             traits.push(t2.tindex)
                //             traitValues.push(t2.val)
                //         }
                //     }
                //     else {
                //         const gTrait = generateRandomTrait(medal)
                //         traits.push(gTrait.tindex)
                //         traitValues.push(gTrait.val)
                //     }
                        
                // } 
                // else 
                //     if(traits.length > 17) {
                //         const tParser = qTraits[0] + qTraits[1]
                //         const t2 = GetMappedTraitFromKey(tParser)
                //         if(!isObjectEmpty(t2)) {
                //             traits.push(t2.tindex)
                //             traitValues.push(t2.val)
                //         }
                //     }
                //     else {
                //         const gTrait = generateRandomTrait(medal)
                //         traits.push(gTrait.tindex)
                //         traitValues.push(gTrait.val)
                //     }
                // if(splitter.length < 3) {
                //     //generate rest of traits
                //     for(let i = splitter.length; i < 3; i++ ) {
                //         const roll = DiceRoll(2)
                //         const traitId = medal.extra_traits[roll]
                //         const eTrait = getExtraTrait(traitId)
                //         splitter.push(`${roll}:${eTrait.max}`)
                //     }
                // }
                // for(let i = 0; i < splitter.length; i++) {
                //         const subSplit = splitter[i].split(':')
                //         const trait = medal.extra_traits[subSplit[0]]
                //         traits.push(trait)
                //         const eTrait = getExtraTrait(trait)
                //         const val = parseFloat(subSplit[1])
                //         traitValues.push(val > eTrait.max ? eTrait.max : val)
                // }
                console.log(medal)
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
            for(let split of splitter) 
                medals.push(HexToInt(split))
            
        return medals
    }
    return (
        <>
        {
        medals.length > 0 ?
        <div className="flex flex-col md:flew-row items-center">
            <div className="flex w-full md:w-1/2 justify-evenly cutTopPrimary">
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
        :
        <div className="flex justify-center cutTopPrimary">
        medal query is invalid
        </div>
        }
        </>
    )
}
export default ViewSet