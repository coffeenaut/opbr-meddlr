
import winston from 'winston'
import minimist from 'minimist-lite';
import characterMedals from '../data/output/characterMedals.json' with {type: "json"}
import eventMedals from '../data/output/eventMedals.json' with {type: "json"}
import ExtraTraits from '../data/output/extraTraits.json' with {type: "json"}
import PrimaryTraits from '../data/output/primaryTraits.json' with {type: "json"}
import Tags from '../data/output/tags.json' with {type: "json"}
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
const syncFilters = args.s
const fullSync = args.f
const testFlag = args.t
const dataPath = "./src/data/output"

if(testFlag) {
    fs.rename(`${dataPath}/extraTraits.test.json`, `${dataPath}/extraTraits.test2.json`, function(err) {
        console.log(err)
    })
}
function writeObjectToFile(object, filename) {
    const outfile = dataPath + filename
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
        //Write ExtraTraits
        logger.info(`writing data to Extra Traits`)
        // archiveFile("extraTraits")
        writeObjectToFile(newExtraData, "/extraTraits.temp.json")

        //Write Tags
        logger.info(`writing data to Tags`)
        // archiveFile("tags")
        writeObjectToFile(newTagData, "/tags.temp.json")

        //Write PrimaryTraits
        logger.info(`writing data to Primary Traits`)
        // archiveFile("primaryTraits")
        writeObjectToFile(newPrimary, "/primaryTraits.temp.json")
    }
    catch (e) {logger.error(e)}
    
}
function archiveFile(filename) {
    logger.info(`writing data to ${filename}`)
        fs.rename(`${dataPath}/${filename}.stale.json`, `${dataPath}/${filename}-archive.json`, function(err) {
            console.log(err)
        })
        fs.rename(`${dataPath}/${filename}.json`, `${dataPath}/${filename}.stale.json`, function(err) {
            console.log(err)
        })
}
if(fullSync) {
    fullMedalSync("character")
    fullMedalSync("event")
}
function fullMedalSync(medalType) {
    let dataSet = []
    let appendEvent = medalType === "event"
    if(medalType === "character")
        dataSet = characterMedals
    else if (medalType === "event")
        dataSet = eventMedals

    let newExtraData = ExtraTraits
    !appendEvent && newExtraData.forEach(t => t.medals = [])
    let newTagData = Tags
    !appendEvent && newTagData.forEach(t => t.medals = [])
    let newPrimary = PrimaryTraits
    !appendEvent && newPrimary.forEach(t => t.medals = [])
    let start = appendEvent ? 0 : 1
    for(let i = start; i < dataSet.length; i++) {
        const medal = dataSet[i]
        const medalIndex = medalType === "character" ? i : `e${i}`
        //Extra
        for(let eTrait of medal.extra_traits) {
            let eIndex = newExtraData.findIndex( e => e.id === eTrait)
            if(eIndex > -1) {
                newExtraData[eIndex].medals = [...newExtraData[eIndex].medals, medalIndex]
                // logger.info(`adding ${medalIndex} to trait ${eTrait} @ ${eIndex}`)
                //save file
            }
            else {
                // logger.error(`error: could not find extra trait ${eTrait} in Extra Trait dataset`)
            }
        }
        //Tags
        for(let tag of medal.tags) {
            let tIndex = newTagData.findIndex( t => t.id === tag)
            
            if(tIndex > -1) {
                newTagData[tIndex].medals = [...newTagData[tIndex].medals, medalIndex]
                logger.info(`adding ${medal.name} (${i}) to trait ${tag} @ ${tIndex}`)
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
            // logger.info(`adding ${medalIndex} to trait ${primary} @ ${pIndex}`)
        }
        else {
            // logger.error(`error: could not find primary trait ${primary} in Primary Trait dataset`)
        }
    
    }
    //uniques
    const tempTags = [...new Set(newTagData)]
    const tempPTraits = [...new Set(newPrimary)]
    const tempETraits = [...new Set(newExtraData)]

    try{
        logger.info(`writing data to Extra Traits`)
        writeObjectToFile(tempETraits, "/extraTraits.temp.json")
        logger.info(`writing data to Tags`)
        writeObjectToFile(tempTags, "/tags.temp.json")
        logger.info(`writing data to Primary Traits`)
        writeObjectToFile(tempPTraits, "/primaryTraits.temp.json")
    }
    catch (e) {logger.error(e)}
    
}
function synchronizeFilters() {
    const primary = categorizePrimaryTraits()
    const extra = categorizeExtraTraits()
    const tags = categorizeTags()

    const categoryList = [{Category: "extra", sub: extra}, {Category: "primary", sub: primary}, {Category: "tags", sub:tags}]
    writeObjectToFile(categoryList, "/filters.temp.json")
    
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
        ["poison", "poison"],
        ["electrocution", "shock"],
        ["burn", "aflame"], //aflame
        ["stun", "stun"],
        ["freeze", "freeze"],
        ["vibrate", "tremor"], //tremor
        ["singsing", "sing-sing"],
        ["skill1", "skill 1 cooldown"],
        ["skill2", "skill 2 cooldown"],
        ["red", "damage reduction"], // damage reduction
        ["damage", "+ damage"],
        ["capture", "capture boost"],
        ["atk", "attack"],
        ["health", "health"],
        ["crit", "crit"],
        ["xp", "+ exprience"],
        ["dodge", "dodge"],
        ["heal", "heal"],
        ["speed", "speed"]
    ]
    let pCategories = []
    for(let i = 0; i < pTraits.length; i++) {
        pCategories.push({Category: pTraits[i][1], medals:[]})
    }
    for(let i = 0; i < traits.length -1; i++) {
        const splitter = traits[i].id.split('_')
        // let found = false
        for(let sIndex = splitter.length -1; sIndex > 0; sIndex--) {
            for (let pIndex = 0; pIndex < pTraits.length; pIndex++) {
                if(splitter[sIndex] === pTraits[pIndex][0]) {
                    if(splitter[sIndex] == "health") { //special case health
                        if(sIndex == splitter.length - 1) {
                            let temp= [...new Set([...pCategories[pIndex].medals,...traits[i].medals])]
                            pCategories[pIndex].medals = temp
                        }
                    }
                    else {
                        let tempMedals = [...new Set([...pCategories[pIndex].medals,...traits[i].medals])]
                        pCategories[pIndex].medals = tempMedals
                    }
                    
                }
            }
            if(splitter[sIndex] === "red")
                sIndex--
            // if(found) {
            //     found = false //reset for next iteration
            //     break
            // }
        }
    }
    return pCategories

}
function categorizeTags() {
    let traits = Tags
    let tag = []
    for(let i = 0; i < traits.length; i++) {
        const splitter = traits[i].id.split('_')
        let tname = ""
        for(let i = 1; i < splitter.length; i++) {
            tname += i < splitter.length - 1 ? `${splitter[i]} ` : splitter[i]
        }
        tag.push({Category: tname, medals: [...new Set(traits[i].medals)]})
    }
    return tag
}