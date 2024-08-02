import winston from 'winston'
import minimist from 'minimist-lite';
import Medals from '../data/output/medals1.json' assert {type: "json"}
import ExtraTraits from '../data/output/eTraits.json' assert {type: "json"}
import PrimaryTraits from '../data/output/primaryTraits2.json' assert {type: "json"}
import Tags from '../data/output/tags2.json' assert {type: "json"}
// import { isObjectEmpty } from './tools';

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
  function writeObjectToFile(object) {
    const outfile = `./src/data/output/${outputFile}`
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

if(medalFlag) {
    let broken = []
    Medals.forEach( (m, i) => {
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
    console.log(ExtraTraits.length)
    // Medals.forEach( (m, i) => {
    //     try {
    //     }
    //     catch (e){logger.error(`error at index ${i}: {$e}`)}
    // })
    console.log("meow")
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