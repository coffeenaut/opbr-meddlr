import StarIcon from '@heroicons/react/20/solid/StarIcon'
import { useRef } from 'react'
import { getTagTrait, getExtraTrait, getPrimaryTrait } from '../util/medalStore'
import { isObjectEmpty } from '../util/tools'
const TraitList = (props) => {
    const showTraits = useRef(false) //reset everytime
    const isMedalSetEmpty = () => {
        let isEmpty = true
        for(let m of props.medals)
            if(!isObjectEmpty(m)) {
                isEmpty = false
                break
            }
        return isEmpty
    }
    const explodeTraits =(medals) => {
        let traitList = []
        let tagList = []
        let extraTraitList = []
        let tagSpiledMedals = [] //array to hold processed medals;used to find duplicates
        for(let medal of medals) {
            let isDuplicate = false
            if(tagSpiledMedals.length < 1)
                tagSpiledMedals.push(medal.id)
            else {
                let sameMedals = tagSpiledMedals.find( m => m === medal.id)
                if(sameMedals === undefined) 
                    tagSpiledMedals.push(medal.id)
                else
                    isDuplicate = true
                                
            }
            if(medal.set_traits) {
                for(let i =0; i < medal.set_traits.length; i++) {
                    extraTraitList.push({trait: medal.extra_traits[medal.set_traits[i]], value: medal.set_traits_values[i]})
                    // let theTrait = ExtraTraits.find( t => t.id == medal.set_traits[i])
                    // let tempTrait = theTrait.name.replace('X%', `${medal.set_traits_values[i]}%`)
                    // traitList.push({type: 'extra', effect: tempTrait})
                }
                if(!isDuplicate) {
                    for (let tag of medal.tags) {

                        let tagFound = false
                        if(tagList.length > 0) {
                            for(let i = 0; i < tagList.length; i++) {
                                if(tagList[i].tag === tag) {
                                    tagFound = true
                                    tagList[i] = {...tagList[i], count: tagList[i].count + 1}
                                }
                            }
                            if (!tagFound) {
                                tagList.push({tag: tag, count: 1})
                            }
                        }
                        else {
                            tagList.push({tag: tag, count: 1})
                        }
                    }
                }
            }
            if(medal.primary) {
                const pTrait = getPrimaryTrait(medal.primary)
                traitList.push({type: 'primary', effect: pTrait.name})
            }
        }
        for(let tagTrait of tagList) {
            if(tagTrait.count > 1) {
                let tTrait = getTagTrait(tagTrait.tag, tagTrait.count)
                let splitter = tagTrait.tag.split('_')
                let traitName = ""
                for(let i = 1; i < splitter.length; i++) {
                    traitName += i < splitter.length -1 ? `${splitter[i]} ` : splitter[i]
                }
                traitList.push({type: 'tag', tag: traitName, effect: tTrait})
            }
        }
        let compiledTraits = []
        for(let eTrait of extraTraitList) {
            let found = false
            for(let c of compiledTraits) {
                if(c.trait === eTrait.trait) {
                    c.value =  c.value + eTrait.value
                    found = true
                    break
                }
            }
            if (!found ) {
                compiledTraits.push(eTrait)
            }
        }
        for(let cTrait of compiledTraits) {
            const extraTrait = getExtraTrait(cTrait.trait)
            // let tempTrait = extraTrait.name.replace('X%', `${cTrait.value}%`)
            if(!isObjectEmpty(cTrait) && cTrait.trait && cTrait.value > 0)
                traitList.push({type: 'extra', effect: extraTrait.name, total: cTrait.value})
            else
                console.log("error",`extra trait is empty or undefined`)

        }
        showTraits.current = !isMedalSetEmpty()
        return traitList
    }
    const traits = explodeTraits(props.medals)
    const ActiveTraits = traits.map((trait, index ) => {
        // let show = props.toggleTraits
        const limit = 70
        const traitAppliedValue = trait.total > limit ? limit : trait.total
        
        const TotalEffect = (prop)  =>{
            return (
                <>
                <div className={`flex ${prop.maxed && " max-text"} `} title={`${trait.total}%`}>
                    {prop.value}% &nbsp;
                </div>
                </>
            )
        }
        return (
            <div key={index} className={`grid grid-cols-5 md:grid-cols-7 gap-x-2 p-2 ${index % 2 > 0 && 'trait-alternate'}`}>
                <div className='flex col-span-2'>
                    {
                        (trait.type === 'extra') 
                        ?
                        [...Array(3)].map((e, i) => {
                            return <StarIcon key={i} className='star-icon'/>
                        }) 
                        : (trait.type === 'primary')
                        ?
                            <div className='capitalize primary-tag'>Unique</div>
                        :
                            <div className='capitalize trait-tag'>{trait.tag}</div>
                    }
                </div>
                <div className='col-span-5'>
                    <div className='flex flex-row trait-text'>
                    {
                    trait.type === "extra" ?
                    // trait.effect.replace("X%", `<div>${trait.total}%</div>`)
                    trait.effect.split("X%").map((splitter, index) => { 
                        return(
                            <>
                            {
                                index < 1 ?
                               <div className='flex'><div>{splitter}</div><TotalEffect value={traitAppliedValue} maxed={traitAppliedValue == limit}></TotalEffect></div>
                                :
                                <div className='flex'>{splitter}</div>
                            }
                            </>
                        )
                    })
                    :
                    trait.effect
                    }
                    </div>                
                </div>
            </div>
        )
    })
    // console.log(traits)
    return (
        <>
        <div className={`flex flex-col rounded-sm trait-list ${showTraits.current ? 'show-traits' : ''}`}>
            <div className='trait-header'>Traits</div>
            {ActiveTraits}
        </div>
        </>
    )
}
export default TraitList