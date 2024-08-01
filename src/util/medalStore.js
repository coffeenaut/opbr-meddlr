import Medals from '../data/output/medals1.json'
import PrimaryTraits from '../data/output/primaryTraits2.json'
import ExtraTraits from '../data/output/extraTraits2.json'
import Tags from '../data/output/tags2.json'
import  Filters from '../data/output/filters.json'
import MappedTraits from '../data/eTraitMap.json'
import Presets from '../data/presets.json'
export function GetAllMedals() {
    return Medals
} 
/**
 * Lookup medal at given index in Medals dataset
 * @param {*} index 
 * @returns medal object
 */
export function GetMedal(index) {
    return Medals[index]
}
/**
 * Lookup in Medals dataset for medal.id
 * @param {*} medalid 
 * @returns medal index
 */
export function GetMedalIndexById(medalid) {
    let index = 0
    index = Medals.findIndex(m => m.id === medalid)
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
    console.log(Object.keys(MappedTraits))
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
    results = Medals.map( (m, i) => m.id !== undefined && m.id.toLowerCase().indexOf(term.toLowerCase()) > -1 && i).filter(x=> x)
    //name
    results = merge(results, Medals.map( (m, i) => m.name !== undefined && m.name.toLowerCase().indexOf(term.toLowerCase()) > -1 && i).filter(x=> x))
    //tags
    let temp  = Medals.map( (m, i) => m.tags !== undefined && 
                m.tags.map((t,j) => { t.toLowerCase().indexOf(term.toLowerCase()) > -1}
                ) && i).filter(x=>x)
    console.log(temp)
    // results = merge(results, Medals.map( (m, i) => m.tags !== undefined && 
    //     m.tags.map((t,j) => {
    //         return t.toLowerCase().indexOf(term.toLowerCase()) > -1}
    //     ) && i).filter(x=>x)
    // )
    return results
}
export function GetPresetsByCategory(cat) {
    return Presets.filter( p => 
        p.categories.some(c => 
            c === cat
        )
    )
}
export function GetPresetCategories() {
    let cats = []
    Presets.forEach(p => {
        cats = merge(cats, p.categories)
    })
    return cats
}