import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon"
import SaveIcon from '@heroicons/react/20/solid/CheckIcon'
import { isObjectEmpty } from "../util/tools"
import {useState} from 'react'
import { getExtraTrait, getPrimaryTrait, getTag } from "../util/medalStore"
const MedalView = (props) => {
    const relativePath= import.meta.env.VITE_site_path
    const medal = props.medal == undefined ? {} : props.medal
    const primaryTrait = getPrimaryTrait(props.medal.primary)
    const extraTraits = props.medal.extra_traits
    const editMode = props.edit
    function closeModal() {
        props.closeWindow()
    }
    const TraitSetOption = (p) => {
        const basicTraits= ['eTrait_atk','eTrait_def','eTrait_crit','eTrait_hp']
        const statusTraits= ['eTrait_singsing','eTrait_candyman','eTrait_aflame','eTrait_%_block','eTrait_%_heart','eTrait_confuse','eTrait_edit','eTrait_freeze','eTrait_frostbite','eTrait_gold','eTrait_intimidate','eTrait_toy','eTrait_bind','eTrait_negative','eTrait_entrance','eTrait_poison','eTrait_%_blocked','eTrait_sleep','eTrait_spiderweb','eTrait_tremor','eTrait_shock','eTrait_stun','eTrait_shadowless']
        const charTypeTraits= ["eTrait_revolutionary_army_atk","eTrait_revolutionary_army_def","eTrait_revolutionary_army_crit","eTrait_revolutionary_army_health","eTrait_longrangenormalattacks_atk","eTrait_longrangenormalattacks_def","eTrait_longrangenormalattacks_crit","eTrait_longrangenormalattacks_health","eTrait_buggy_delivery_atk","eTrait_buggy_delivery_def","eTrait_buggy_delivery_crit","eTrait_buggy_delivery_health","eTrait_baroque_works_atk","eTrait_baroque_works_def","eTrait_baroque_works_crit","eTrait_baroque_works_health","eTrait_captain_atk","eTrait_captain_def","eTrait_captain_crit","eTrait_captain_health","eTrait_cipher_pol_atk","eTrait_cipher_pol_def","eTrait_cipher_pol_crit","eTrait_cipher_pol_health","eTrait_kozuki_clan_atk","eTrait_kozuki_clan_def","eTrait_kozuki_clan_crit","eTrait_kozuki_clan_health","eTrait_donquixote_family_atk","eTrait_donquixote_family_def","eTrait_donquixote_family_crit","eTrait_donquixote_family_health","eTrait_kuja_pirates_atk","eTrait_kuja_pirates_def","eTrait_kuja_pirates_crit","eTrait_kuja_pirates_health","eTrait_whitebeard_pirates_atk","eTrait_whitebeard_pirates_def","eTrait_whitebeard_pirates_crit","eTrait_whitebeard_pirates_health","eTrait_blackbeard_pirates_atk","eTrait_blackbeard_pirates_def","eTrait_blackbeard_pirates_crit","eTrait_blackbeard_pirates_health","eTrait_strawhat_pirates_atk","eTrait_strawhat_pirates_def","eTrait_strawhat_pirates_crit","eTrait_strawhat_pirates_health","eTrait_roger_pirates_atk","eTrait_roger_pirates_def","eTrait_roger_pirates_crit","eTrait_roger_pirates_health","eTrait_redhaired_pirates_atk","eTrait_redhaired_pirates_def","eTrait_redhaired_pirates_crit","eTrait_redhaired_pirates_health","eTrait_animal_kingdom_pirates_atk","eTrait_animal_kingdom_pirates_def","eTrait_animal_kingdom_pirates_crit","eTrait_animal_kingdom_pirates_health","eTrait_charlotte_family_atk","eTrait_charlotte_family_def","eTrait_charlotte_family_crit","eTrait_charlotte_family_health","eTrait_worst_generation_atk","eTrait_worst_generation_def","eTrait_worst_generation_crit","eTrait_worst_generation_health","eTrait_germa66_atk","eTrait_germa66_def","eTrait_germa66_crit","eTrait_germa66_health","eTrait_grand_line_atk","eTrait_grand_line_def","eTrait_grand_line_crit","eTrait_grand_line_health","eTrait_fish-man_atk","eTrait_fish-man_def","eTrait_fish-man_crit","eTrait_fish-man_health","eTrait_new_world_atk","eTrait_new_world_def","eTrait_new_world_crit","eTrait_new_world_health","eTrait_logia_atk","eTrait_logia_def","eTrait_logia_crit","eTrait_logia_health","eTrait_navy_atk","eTrait_navy_def","eTrait_navy_crit","eTrait_navy_health","eTrait_ninja_atk","eTrait_ninja_def","eTrait_ninja_crit","eTrait_ninja_health","eTrait_paramecia_atk","eTrait_paramecia_def","eTrait_paramecia_crit","eTrait_paramecia_health","eTrait_alabasta_kingdom_atk","eTrait_alabasta_kingdom_def","eTrait_alabasta_kingdom_crit","eTrait_alabasta_kingdom_health","eTrait_chambres_atk","eTrait_chambres_def","eTrait_chambres_crit","eTrait_chambres_health","eTrait_minks_tribe_atk","eTrait_minks_tribe_def","eTrait_minks_tribe_crit","eTrait_minks_tribe_health","eTrait_zoan_atk","eTrait_zoan_def","eTrait_zoan_crit","eTrait_zoan_health"]
        const basicRange = [3.5, 4, 4.5, 6, 6.5, 7.5, 11, 12, 14 ]
        const statusRange = [6, 9, 12, 15, 18, 24, 27, 30, 36]
        const charTypeRange = [14, 16, 18]

        const [traitValue, setTraitValue] = useState(p.setTrait)
        const [tvalue, setTValue] = useState(p.setTraitValue) 
        const [traitId, setTraitId] = useState(p.traitList[traitValue])

        const range = basicTraits.indexOf(traitId) > -1 ?
            basicRange :
            statusTraits.indexOf(traitId) > -1 ?
            statusRange :
            charTypeTraits.indexOf(traitId) > -1 ?
            charTypeRange : []
        
        const traitNameId = `trait-${p.tindex}`
        const traitValueId = `traitvalue-${p.tindex}`
        function updateRange (val) {
            setTraitId(p.traitList[val])
        }
        return (
            p.setTrait != undefined &&
            <>
            <div className="flex justify-between">
                <div className="flex w-3/4">
                    <select className="w-full rounded-lg form-input" 
                    value={traitValue}
                    name={traitNameId}
                    onChange={e => {
                        setTraitValue(e.target.value);
                        updateRange(e.target.value)

                    }}
                    >
                        {
                            p.traitList.map((tra, i) => {
                                let theTrait = getExtraTrait(tra)
                                return (<option value={i}>{theTrait.name}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="flex w-1/6">
                    <select className="flex w-full rounded-lg form-input" 
                    value={tvalue}
                    name={traitValueId}
                    onChange={e => {
                        setTValue(e.target.value);
                    }}
                    >
                        {
                            range.map((r,i) => {
                                return (<option value={r}>{r}</option>)
                            })
                        }
                    </select>
                </div>
            </div>
            
            </>
        )
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target)
        let traitList = [...Array(3)]
        let traitValueList = [...Array(3)]
        for(const pair of data.entries()) {
            const splitter = pair[0].split('-')
            if(splitter[0] === "trait") {
                traitList[parseInt(splitter[1])] = pair[1]
            }
            else if (splitter[0] === "traitvalue")
                traitValueList[parseInt(splitter[1])] = parseFloat(pair[1])
        }
        props.saveMedalTraits(traitList, traitValueList, medal.position)
      } 
    return (
        
        <>
        {
            editMode ? 
            <>
            <form onSubmit={handleSubmit}>
            {props.closeWindow != false && <div className="flex justify-between cursor-pointer "><button className="transparent" type="submit"><SaveIcon className="icon-small-primary" /></button><XMarkIcon onClick={closeModal} className="icon-medium-grey" /></div>}
            <div className="flex flex-col gap-2 justify-center">
                {
                    !isObjectEmpty(medal) &&
                    <>
                    <div className="flex cutBottom">
                        <div className="flex-col m-2 cutTop border-t-0">
                            <div className="flex justify-center">
                                {medal.name}
                            </div>
                            <div className="flex justify-center items-center medal-image">
                                <img className={`medal-image`} src={`/${relativePath}/medals/${medal.image}.png`} />
                               
                            </div>
                        </div>
                        <div className="flex items-center">
                            {primaryTrait != undefined && primaryTrait.name}
                        </div>
                    </div>
                        <div className="flex">
                        {!isObjectEmpty(medal) && 
                        <>
                            
                            <div className="flex flex-col gap-2 w-full">
                            {
                                medal.set_traits.map((t, i) => {
                                    return (
                                        <>
                                        <div className="flex flex-col">
                                            <TraitSetOption tindex={i} setTrait={medal.set_traits[i]} setTraitValue={medal.set_traits_values[i]} traitList={extraTraits} />
                                        </div>
                                        </>
                                    )
                                    })
                            }
                            </div>
                        </> 
                        }
                        </div>
                    </>
                }
            </div>
            </form>
            </>
            : //read only mode
            <>
            { 
                !isObjectEmpty(medal) &&
                <>
                    <div className="flex flex-wrap gap-2">
                   {
                        medal.tags.map((t, i) => {
                            const tTag = getTag(t)
                            let tagName = ""
                            if (!isObjectEmpty(tTag))
                                tagName = tTag.name
                            else
                                tagName = "error"
                            return <div className="capitalize trait-tag">{tagName}</div>
                        })
                    }
                    </div>
                    <div className="flex flex-col gap-2 w-full overflow-y-auto">
                        <div className="border-b-2 border-red-300 font-bold">Trait Chances</div>
                    {
                        medal.extra_traits.map((e, i) => {
                            let effect = getExtraTrait(e)
                            let effectText = effect.name.replace("X%", `(${effect.min}% - ${effect.max}%)`)
                            return (
                                <>
                                 <div className={`flex ${i % 2 > 0 && 'trait-alternate'}`} key={i}>
                                    <div className="flex">
                                    {effectText}
                                    </div>
                                </div>
                                </>
                            ) 
                               
                        })
                    }
                    </div>
                </>
            }
            </>
        }
        </>
    )

}
export default MedalView