import CharacterMedals from '../data/output/characterMedals.json' assert {type: "json"}
import EventMedals from '../data/output/eventMedals.json' assert {type: "json"}
import PrimaryTraits from '../data/output/primaryTraits.json' assert {type: "json"}
import ExtraTraits from '../data/output/extraTraits.json' assert {type: "json"}
import Tags from '../data/output/tags.json' assert {type: "json"}
import  Filters from '../data/output/filters.json' assert {type: "json"}
import MappedTraits from '../data/eTraitMap.json' assert {type: "json"}
import Presets from '../data/presets.json' assert {type: "json"}
import { DiceRoll } from './tools.js'

/**
 * parses the given index and returns the index value if an event medal
 * @param {*} mindex //index of medal 
 * @returns event medal index || false
 */
function isEventMedal(mindex) {
    if (typeof mindex === 'string' || mindex instanceof String) {
        let temp = mindex.substring( 1, mindex.length)
        if(temp)
        {
            return parseInt(temp)
        }
    }
    //charMedals
    else 
        return false
    
}
export function GetAllMedals() {
    return [...CharacterMedals, ...EventMedals]
}
/** UI needs this for index calculations
 * returns length of character medals
 */
export function GetCharacterMedalLength() {
    return CharacterMedals.length
}
/**
 * Lookup medal at given index in Medals dataset
 * @param {*} index 
 * @returns medal object
 */
export function GetMedal(index) {
    let eventIndex = isEventMedal(index)
    if(eventIndex)
        return EventMedals[eventIndex]
    else 
        return CharacterMedals[index]
}
/**
 * Lookup in Medals dataset for medal.id
 * Used for hex conversion for url encoding
 * @param {*} medalid 
 * @returns medal index
 */
export function GetMedalIndexById(medalid) {
    let index = CharacterMedals.findIndex(m => m.id === medalid)
    if(index < 0) {//event Medal
        index = EventMedals.findIndex(m => m.id === medalid)
        if(index > 0)
            index = index+1000 // limits character medals to 999
    }
        
    return index
}
/**
 * Lookup in Extra Traits dataset for trait.id
 * @param {*} traitId 
 * @returns trait object
 */
export function getExtraTrait(traitId) {
    return ExtraTraits.find(e => e.id === traitId)
}
/**
 * Lookup in PrimaryTraits dataset for trait.id
 * @param {*} traitId 
 * @returns trait object
 */
export function getPrimaryTrait(traitId) {
    return PrimaryTraits.find( p=> p.id === traitId)
}
/**
 * Lookup in Tags dataset for tag.id
 * @param {*} tagId 
 * @returns tab object
 */
export function getTag(tagId) {
    return Tags.find(t => t.id === tagId)
}
/**
 * Lookup + Format for tag trait given trait.id
 * @param {*} tagId 
 * @param {*} count 
 * @returns (string) pre-formatted trait effect text 
 */
export function getTagTrait (tagId, count) {
    let trait = Tags.filter(t => {
        return t.id == tagId
    })
    let num = trait[0].min
    if(count > 2) 
        num = trait[0].max
    return  `${num}% ${trait[0].effect}`
}
export function GetFilters() {
    return Filters
}
/**
 * Lookup for url encoded mapping of trait value pair
 * @param {*} tIndex index of trait to lookup in hashset
 * @param {*} val value to lookup
 * @returns endcoded trait for URL-friendly params
 */
export function GetMappedTraitKey(tIndex, val) {
    // let entries = Object.entries(MappedTraits)
    // let key = ""
    // for (let i = 0; i < entries.length; i++ ) {
    //     if (entries[i][1].tindex === parseInt(tIndex) && entries[i][1].val === val) {
    //         key = entries[i][0]
    //         break
    //     }
    // }
    // return key
    return Object.keys(MappedTraits).find(key => MappedTraits[key].tindex == tIndex && parseFloat(MappedTraits[key].val) == parseFloat(val));
    
  }
  /**
 * Lookup for mapped trait of url encoded trait value pair
 * @param {*} key Object key parsed from url
 * @returns object containing medal set values of extra traits
 */
  export function GetMappedTraitFromKey(key) {
    return MappedTraits[key]
  }
  /**
   * Merges two arrays without duplicates
   * @param {*} a [] first array
   * @param {*} b [] second array
   * @param {*} predicate 
   * @returns combined array
   */
const merge = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}
/**
 * 
 * @param {*} term string: finds medal indexes that matched term in medal.id and medal.name
 * @returns an array of medal indexes
 */
export function SearchMedal(term) {
    let results = []
    //ids may have more meanigful search for character names
    results = merge(results, CharacterMedals.map( (m, i) => m.id !== undefined && m.id.toLowerCase().indexOf(term.toLowerCase()) > -1 && i).filter(x=> x))
    results = merge(results, EventMedals.map( (m, i) =>  {
        if(m.id !== undefined && m.id.toLowerCase().indexOf(term.toLowerCase()) > -1) 
            return i + CharacterMedals.length
    }).filter(x=> x))
    //name
    results = merge(results, CharacterMedals.map( (m, i) => m.name !== undefined && m.name.toLowerCase().indexOf(term.toLowerCase()) > -1 && i).filter(x=> x))
    results = merge(results, EventMedals.map( (m, i) => {
        if(m.name !== undefined && m.name.toLowerCase().indexOf(term.toLowerCase()) > -1) 
            return i + CharacterMedals.length
    }).filter(x=> x))
    //tags
    // results = merge(results, Medals.map( (m, i) => m.tags !== undefined && 
    //     m.tags.map((t,j) => {
    //         return t.toLowerCase().indexOf(term.toLowerCase()) > -1}
    //     ) && i).filter(x=>x)
    // )
    return results
}
/**
 * Filters the preset data set by given category name
 * @param {*} cat string -> category to filter by
 * @returns array of medal objects that contain given category name property
 */
export function GetPresetsByCategory(cat) {
    return Presets.filter( p => 
        p.categories.some(c => 
            c === cat
        )
    )
}
/**
 * Gets list of all possible categories from presets
 * @returns array of category names
 */
export function GetPresetCategories() {
    let cats = []
    Presets.forEach(p => {
        cats = merge(cats, p.categories)
    })
    return cats
}
/**
 * Rolls the dice to retrieve a random medal set from preset data set
 */
export function GetRandomPresetMedal() {
    let roll = DiceRoll(Presets.length -1)
    return Presets[roll]
}
const medalStore = () => {
    return null
}
export default medalStore 