import Medals from '../data/output/medals1.json'
import PrimaryTraits from '../data/output/primaryTraits2.json'
import ExtraTraits from '../data/output/extraTraits2.json'
import Tags from '../data/output/tags2.json'
import  Filters from '../data/output/filters.json'
export function GetAllMedals() {
    return Medals
} 
export function GetMedal(index) {
    return Medals[index]
}
export function GetMedalIndexById(medalid) {
    let index = 0
    index = Medals.findIndex(m => m.id === medalid)
    return index
}
export function getExtraTrait(traitId) {
    return ExtraTraits.find(e => e.id === traitId)
}
export function getPrimaryTrait(traitId) {
    
    return PrimaryTraits.find( p=> p.id === traitId)
}
export function getTag(tagId) {
    return Tags.find(t => t.id === tagId)
}
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
const merge = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a]; // copy to avoid side effects
    // add all items from B to copy C if they're not already present
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}
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