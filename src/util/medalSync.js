
import winston from 'winston'
import minimist from 'minimist-lite';
import characterMedals from '../data/output/characterMedals.json' assert {type: "json"}
import eventMedals from '../data/output/eventMedals.json' assert {type: "json"}
import ExtraTraits from '../data/output/extraTraits.json' assert {type: "json"}
import PrimaryTraits from '../data/output/primaryTraits.json' assert {type: "json"}
import Tags from '../data/output/tags.json' assert {type: "json"}
import { getExtraTrait, getTag, getPrimaryTrait } from './medalStore.js'
import { isObjectEmpty } from './tools.js'
import fs from 'fs'

const { combine, timestamp, printf, align } = winston.format;

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.File({
      filename: `logs/data-sync-${new Date().toISOString().split('T')[0]}.log`,
    })],
  })
let args = minimist(process.argv.slice(2))
// const last5Flag = args.l
const syncCharacterFlag = args.c
const syncEventFlag = args.e
const limitFlag = args.l
const syncFilters = args.f
function writeObjectToFile(object, filename) {
    const outfile = `./src/data/output/${filename}`
    const outString = JSON.stringify(object, null, 2)
    // const outString = JSON.stringify(object)
    fs.writeFileSync(outfile, outString, err => {
        if (err) {
          throw err
        }
      });
}
if(limitFlag) {
    if(syncCharacterFlag) {
        syncMedals(limitFlag, "character")
    }
    else if (syncEventFlag) {
        syncMedals(limitFlag, "event")
    }
}
if(syncFilters) {
    synchronizeFilters()
}
function syncMedals(limit, medalType) {
    let dataSet = []
    if(medalType === "character")
        dataSet = characterMedals
    else if (medalType === "event")
        dataSet = eventMedals

    let newExtraData = ExtraTraits
    let newTagData = Tags
    let newPrimary = PrimaryTraits
    for(let i = dataSet.length - limit; i < dataSet.length; i++) {
        const medal = dataSet[i]
        const medalIndex = medalType === "character" ? i : `e${i}`
        //Extra
        for(let eTrait of medal.extra_traits) {
            let eIndex = newExtraData.findIndex( e => e.id === eTrait)
            if(eIndex > -1) {
                newExtraData[eIndex].medals = [...newExtraData[eIndex].medals, medalIndex]
                logger.info(`adding ${medalIndex} to trait ${eTrait} @ ${eIndex}`)
                //save file
            }
            else {
                logger.error(`error: could not find extra trait ${eTrait} in Extra Trait dataset`)
            }
        }
        //Tags
        for(let tag of medal.tags) {
            let tIndex = newTagData.findIndex( t => t.id === tag)
            
            if(tIndex > -1) {
                newTagData[tIndex].medals = [...newTagData[tIndex].medals, medalIndex]
                logger.info(`adding ${medalIndex} to trait ${tag} @ ${tIndex}`)
            }
            else {
                logger.error(`error: could not find tag ${tag} in Tags dataset`)
            }
        }
        //Primary
        let primary = medal.primary
        let pIndex = newPrimary.findIndex( p => p.id === primary)
        if(pIndex > -1) {
            newPrimary[pIndex].medals = [...newPrimary[pIndex].medals, medalIndex]
            logger.info(`adding ${medalIndex} to trait ${primary} @ ${pIndex}`)
        }
        else {
            logger.error(`error: could not find primary trait ${primary} in Primary Trait dataset`)
        }
    
    }
    try{
        logger.info(`writing data to Extra Traits`)
        writeObjectToFile(newExtraData, "extraTraits.test.json")
        logger.info(`writing data to Tags`)
        writeObjectToFile(newTagData, "tags.test.json")
        logger.info(`writing data to Primary Traits`)
        writeObjectToFile(newPrimary, "primaryTraits.test.json")
    }
    catch (e) {logger.error(e)}
    
}
function synchronizeFilters() {
    const primary = categorizePrimaryTraits()
    const extra = categorizeExtraTraits()
    const tags = categorizeTags()

    const categoryList = [{Category: "extra", sub: extra}, {Category: "primary", sub: primary}, {Category: "tags", sub:tags}]
    writeObjectToFile(categoryList, "filters.test.json")
    
}
function getMedalsForCategory(data) {
    const traits = data
    let categories = []
    let extra = []
    let primary = []
    let tag = []
    //primary traits categories to be mapped
    
    //create category object
    let pCategories = []
    for(let i = 0; i < pTraits.length; i++) {
        pCategories.push({Category: pTraits[i][1], medals:[]})
    }
        
    
    for(let i = 0; i < traits.length -1; i++) {
        const splitter = traits[i].id.split('_')
        if(traitType === "extra") {
            //base & status
            if(i < 24) {
                extra.push({Category: splitter[splitter.length-1], medals: traits[i].medals})
            }
            else if (i > 23 && i < 144) {// character types
                let temp = ""
                for (let j = 1; j < splitter.length - 1; j++) {
                    temp += j < splitter.length -2 ? `${splitter[j]} ` : splitter[j]
                }
                let tempMedals = [...new Set([...traits[i].medals,...traits[i+1].medals,...traits[i+2].medals])]
                extra.push({Category: temp, medals: tempMedals})
                i = i + 3
            }
        }
        else if (traitType === "primary") { 
            let found = false
            for(let sIndex = splitter.length -1; sIndex > 0; sIndex--) {
                for (let pIndex = 0; pIndex < pTraits.length; pIndex++) {
                    if(splitter[sIndex] === pTraits[pIndex][0]) {
                        let tempMedals = [...new Set([...pCategories[pIndex].medals,...traits[i].medals])]
                        pCategories[pIndex].medals = tempMedals
                        found = true
                        break
                    }
                }
                if(found) {
                    found = false //reset for next iteration
                    break
                }
            }
            
            
        }
        else if (traitType === "tag") {
            let tname = ""
            for(let i = 1; i < splitter.length; i++) {
                tname += i < splitter.length - 1 ? `${splitter[i]} ` : splitter[i]
            }
            tag.push({Category: tname, medals: traits[i].medals})
    
        }    
    }
    categories.push({Category: "extra", sub: extra})
    categories.push({Category: "primary", sub: pCategories})
    categories.push({Category: "tag", sub: tag})
    return categories
}
function categorizeExtraTraits() {
    const traits = ExtraTraits
    let extra = []
    for(let i = 0; i < traits.length -1; i++) {
        const splitter = traits[i].id.split('_')
        if(i < 24) {
            extra.push({Category: splitter[splitter.length-1], medals: traits[i].medals})
        }
        else if (i > 23 && i < 144) {// character types
            let temp = ""
            for (let j = 1; j < splitter.length - 1; j++) {
                temp += j < splitter.length -2 ? `${splitter[j]} ` : splitter[j]
            }
            let tempMedals = [...new Set([...traits[i].medals,...traits[i+1].medals,...traits[i+2].medals])]
            extra.push({Category: temp, medals: tempMedals})
            i = i + 3
        }
    }
    return extra

}
function categorizePrimaryTraits() {
    const traits = PrimaryTraits
    const pTraits = [
        //[trait id, display name]
        ["skill1", "skill 1 cooldown"],
        ["skill2", "skill 2 cooldown"],
        ["damage", "+ damage"],
        ["capture", "capture boost"],
        ["red", "damage reduction"], // damage reduction
        ["atk", "attack"],
        ["health", "health"],
        ["crit", "crit up"],
        ["xp", "+ exprience"],
        ["dodge", "dodge"],
        ["heal", "heal"],
        ["poison", "Poison"],
        ["electrocution", "shock"],
        ["burn", "aflame"], //aflame
        ["stun", "stun"],
        ["freeze", "freeze"],
        ["vibrate", "tremor"], //tremor
        ["singsing", "sing-sing"],
        ["speed", "speed"]
    ]
    let pCategories = []
    for(let i = 0; i < pTraits.length; i++) {
        pCategories.push({Category: pTraits[i][1], medals:[]})
    }
    for(let i = 0; i < traits.length -1; i++) {
        const splitter = traits[i].id.split('_')
        let found = false
        for(let sIndex = splitter.length -1; sIndex > 0; sIndex--) {
            for (let pIndex = 0; pIndex < pTraits.length; pIndex++) {
                if(splitter[sIndex] === pTraits[pIndex][0]) {
                    let tempMedals = [...new Set([...pCategories[pIndex].medals,...traits[i].medals])]
                    pCategories[pIndex].medals = tempMedals
                    found = true
                    break
                }
            }
            if(found) {
                found = false //reset for next iteration
                break
            }
        }
    }
    return pCategories

}
function categorizeTags() {
    let traits = Tags
    let tag = []
    for(let i = 0; i < traits.length -1; i++) {
        const splitter = traits[i].id.split('_')
        let tname = ""
        for(let i = 1; i < splitter.length; i++) {
            tname += i < splitter.length - 1 ? `${splitter[i]} ` : splitter[i]
        }
        tag.push({Category: tname, medals: traits[i].medals})
    }
    return tag
}