import { useSearchParams } from "react-router-dom"
import { isObjectEmpty, DiceRoll, HexToInt } from "../util/tools"
import { GetMedal, getExtraTrait } from "../util/medalStore"
import MinusCircleIcon from "@heroicons/react/20/solid/MinusCircleIcon"
import { useState } from "react"
import TraitList from '../components/TraitList'
import MedalStack from "../components/MedalStack"
const ViewSet = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const qMedals = searchParams.get("medals")
    const traits1 = searchParams.get("t1")
    const traits2 = searchParams.get("t2")
    const traits3 = searchParams.get("t3")
    const parsedMedals = parseMedalQuery(qMedals)
    const setMedals = (parsed) => {
        let tempMeds = []
        console.log(traits1, traits2, traits3)
        for(let i = 0; i < parsed.length; i++) {
            let medal = GetMedal(parsed[i])
            if(medal) {
                let traits = []
                let traitValues = []
                let splitter = []
                //generate extra traits
                if(i == 0) {
                    if(traits1)
                        splitter = traits1.split(',')
                }
                else if (i == 1) {
                    if(traits2) 
                        splitter = traits2.split(',')
                } 
                else 
                    if(traits3)
                        splitter = traits3.split(',')
                if(splitter.length < 3) {
                    //generate rest of traits
                    for(let i = splitter.length; i < 3; i++ ) {
                        const roll = DiceRoll(2)
                        const traitId = medal.extra_traits[roll]
                        const eTrait = getExtraTrait(traitId)
                        splitter.push(`${roll}:${eTrait.max}`)
                    }
                }
                for(let i = 0; i < splitter.length; i++) {
                        const subSplit = splitter[i].split(':')
                        const trait = medal.extra_traits[subSplit[0]]
                        traits.push(trait)
                        const eTrait = getExtraTrait(trait)
                        const val = parseFloat(subSplit[1])
                        traitValues.push(val > eTrait.max ? eTrait.max : val)
                }
                
                // for(let i = 0; i < 3; i++) {
                //     traits.push(medal.extra_traits[DiceRoll(2)])
                //     const eTrait = getExtraTrait(traits[i])
                //     traitValues.push(DiceRoll(eTrait.max, eTrait.min))
                // }
                
                medal.set_traits = traits
                medal.set_traits_values = traitValues
                tempMeds.push(medal)
            }
            
        }
        return tempMeds
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