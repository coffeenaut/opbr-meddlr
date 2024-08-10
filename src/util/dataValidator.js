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
      filename: `logs/data-validator-${new Date().toISOString().split('T')[0]}.log`,
    })],
  })
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
let args = minimist(process.argv.slice(2))
const primaryTraitFlag = args.p
const medalFlag = args.m
const extraFlag = args.e
const tagFlag = args.t
const last5Flag = args.l
const testFlag = args.t
if(medalFlag) {
    let broken = []
    characterMedals.forEach( (m, i) => {
        try {
            const identifier = `${i}/${m.id}`
            logger.info(`validating ${m.name}`)
            // if(isObjectEmpty(m)) {
            //     logger.warn(`empty medal at index ${i}`)
            // }
            // else {
                //name
                if(m.name === undefined ) {
                    broken.push(identifier)
                    logger.error(`missing name @ ${identifier}`)
                }
                //image
                if(m.image === undefined ) {
                    broken.push(identifier)
                    logger.error(`missing image @ ${identifier}`)
                }
                //primary trait
                if(m.primary === undefined ) {
                    broken.push(identifier)
                    logger.error(`missing primary trait @ ${identifier}`)
                }
                //extra trait
                if(m.extra_traits && m.extra_traits.length < 3 ) {
                    broken.push(identifier)
                    logger.error(`extra trait may be missing @ ${identifier}`)
                }
                //tags
                if(m.tags && m.tags.length < 1 ) {
                    broken.push(identifier)
                    logger.error(`tags may be missing @ ${identifier}`)
                }
            // }
            logger.info('medal validation complete')
        }
        catch (e) {logger.error(`error for medal index ${i}: ${e}`)}  
    })
    console.log(broken)
}
if(primaryTraitFlag) {
    console.log(PrimaryTraits.length)
}
if(extraFlag) {
    let broken = []
    characterMedals.forEach( (m, i) => {
        try {
            //verify trait record exists in extra traits
            if(m.extra_traits.length < 2) {
                logger.error(`missing extra trait @ ${i} / ${m.id} #traits-${m.extra_traits.length}`)
                console.log(`missing extra trait @ ${i} / ${m.id} #traits-${m.extra_traits.length}`)
                broken.push({medal: m.id, mindex: i, traits: m.extra_traits.length})
            }
                
            m.extra_traits.forEach((e, j) => {
                // let eTrait = getExtraTrait(e)
                // if (!isObjectEmpty(eTrait))
                // {
                    
                // }
                // else {
                //     logger.error(`missing extra trait @ ${j}`)
                //     broken.push({medal: m.id, mindex: i, bTrait: j})
                //     console.log(m.id)
                // }
            })

        }
        catch (e){logger.error(`error at index ${i}: {$e}`)}
    })
    if(broken.length > 0) {
        writeObjectToFile(broken, "bad-eTraits.json")
    }
}
if(tagFlag) {
    let list = []
    console.log(Tags.length)
    // Tags.forEach( (t, i) => {
    //     const id = `${i}/${t.id}`
    //     try {
    //         if(t.medals && t.medals.length < 1) {
    //             logger.warn(`there are no medals assigned to tag ${id}`)
    //         }
    //         else {

    //         }
    //     }
    //     catch (e){logger.error(`error at index ${i}: {$e}`)}
    // })
}
if(last5Flag) {
    console.log("characters")
    for(let i = characterMedals.length -6; i < characterMedals.length; i++) {
        console.log(i, characterMedals[i].name, characterMedals[i].primary, characterMedals[i].extra_traits)
    }
    console.log("event")
    for(let i = eventMedals.length -6; i < eventMedals.length; i++) {
        console.log(i, eventMedals[i].name, eventMedals[i].primary, eventMedals[i].extra_traits)
    }
}
if(testFlag) {
    // eventMedals.forEach( (m,i) => {console.log(i+1, m.image.substring(m.image.length-3, m.image.length))})
    eventMedals.forEach((m,i) => {if(m.extra_traits.length > 6) console.log(i,m.id)} )
}
