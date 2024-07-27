import fs from 'fs'
import minimist from 'minimist-lite';
import { parse } from 'csv-parse/browser/esm';
const medalData = './src/data/opbr-medals.csv'

/**
 * medal data compiler script
 */

let args = minimist(process.argv.slice(2))
const outputFile = args.o
const tagFlag = args.t
const primaryTraitFlag = args.p
const extraTraitFlag = args.e
const medalFlag = args.m
const categorizeFlag =  args.c
const inputFile = args.i
const listMedalFlag = args.l
const best = args.best

if(outputFile) {
    if(tagFlag) {
        const tags = generateTagList(8, 119)
        writeObjectToFile(tags)
    }
    if(primaryTraitFlag) {
        const traits = generateTraitList(120, 371)
        writeObjectToFile(traits)
    }
    if(extraTraitFlag) {
        const traits = generateTraitList(372, 515)
        const list = []
        for(let i = 0; i <traits.length; i++) {
            list.push(traits[i].id)
        }
        console.log(list)
        writeObjectToFile(list)
    }
    if(medalFlag) {
        let medals = compileMedals()
        console.log(medals.length)
        medals = mapTraits(medals, "primaryTraits.json", "p")
        medals = mapTraits(medals, "extraTraits.json", "e")
        medals = mapTraits(medals, "tags2.json", "t")
        writeObjectToFile(medals)
    }
    if(inputFile && categorizeFlag) {
        let cat = categorizeMedals(inputFile, "tag")
        writeObjectToFile(cat)
       //  console.log(cat[0].sub)
       }
       if(inputFile && listMedalFlag) {
        let meds = printMedals(inputFile)
        writeObjectToFile(meds)
       }
}
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
function generateTagList(start, end) {
    let tags = []
    try {
        const data = fs.readFileSync(medalData, 'utf-8')
        const rows = data.split(/\r?\n/)
        for(let i = start; i < end ; i++) {
            const splitter = rows[i].split(',')
            const cSplitter = splitter[2].split('_')           
                if (cSplitter.length > 0) {
                    const limitSplit = cSplitter[cSplitter.length -2 ].split('/')
                    let min = Number(limitSplit[0])
                    let max = Number(limitSplit[1])

                    let effect = cSplitter[cSplitter.length -1]
                    if(effect == "skill1") {
                        effect = "Skill 1 cooldown"
                    }
                    else if (effect == "skill2") {
                        effect = "Skill 2 cooldown"
                    }
                    else if (effect == "dodge") {
                        effect = "Reduce dodge cooldown"
                    }
                    else if (effect == "capture") {
                        effect = "Increase capture speed"
                    }
                    else if (effect == "damage") {
                        if(cSplitter[1] == "allies")
                            effect = "Increased damage when allies present"
                        else // less
                            effect = "Increased damage when less treasure secured"
                    }
                    else if (effect == "red") {
                        if (cSplitter[1] == 0)
                        effect = "Damage reduced when no allies present"
                        else {//less
                            effect = "Damage reduced when less treasure secured"
                        }
                        min = 7
                        max = 10
                    }
                    const medals = getMappedMedals(splitter)
                    let tTag = {
                        id: splitter[0],
                        name: splitter[1],
                        effect: effect,
                        min: min,
                        max: max,
                        medals: medals
                    }
                    tags.push(tTag)
                }
        }
    }
    catch(e) {throw e}
    return tags
}
function generateTraitList(start, end) {
    let traits = []
    try {
        const data = fs.readFileSync(medalData, 'utf-8')
        const rows = data.split(/\r?\n/)
        for(let i = start; i < end ; i++) {
            const splitter = rows[i].split(',')
            //parse meta traits
            const cSplitter = splitter[2].split('_')
            const name = splitter[3]
            let category = []
            let tName = name.replace("+X%", "Increase")
            tName = name.replace("-X%", "Reduce")
            let trait = {}
            if (cSplitter.length > 0) {
                let traitId = ''
                // let effect = ''
                if(i < 119) { //base traits
                    traitId = `eTrait_${cSplitter[2]}`
                    if (cSplitter.length > 3)
                        traitId += `_${cSplitter[3]}`
                }
                else if(i > 119 && i < 371) { //base traits
                    let tempName = ''
                    for(let j = 1; j < cSplitter.length; j++) 
                        tempName += `${cSplitter[j]}_`
                    
                    //trim trailing '_'
                    tempName = tempName.substring(0, tempName.length -1)
                    traitId = `pTrait_${tempName}`
                    let formatter = name.replace("- ", "When team has less ")
                    formatter = formatter.replace("+ ", "When team has more ")
                    formatter = formatter.replace("0 ally at treasure:", "When no allies are near the same treasure:")
                    formatter = formatter.replace("Allies at treasure:", "When allies are near the same treasure:")
                    formatter = formatter.replace("End<:", "When there are less than ")
                    formatter = formatter.replace("Allied treasure:", "When team has more ")
                    formatter = formatter.replace("Allied treasure >", "When team has more ")
                    formatter = formatter.replace("Allied treasure <", "When team has more ")
                    formatter = formatter.replace("Enemy treasure:", "When team has more ")
                    formatter = formatter.replace("Enemy treasure >", "When team has more ")
                    formatter = formatter.replace("Enemy treasure <", "When team has more ")
                    
                    formatter = formatter.replace("HP<", "When your HP is less than ")
                    formatter = formatter.replace("HP>", "When you HP is more than ")
                    formatter = formatter.replace("Enemy treasure <", "When enemy's treasure guage is less than ")
                    formatter = formatter.replace("Enemy treasure >", "When enemy's treasure guage is more than ")
                    formatter = formatter.replace("reload speed", "cooldown")
                    formatter = formatter.replace("Enemy KOed:", "After KOing an enemy:")
                    tName = formatter
                    // effect = formatter
                }
                else if (i > 371){ //fancy traits
                    let tempName = ''
                    for(let j = 1; j < cSplitter.length; j++) 
                        if( j != cSplitter.length -2)
                            tempName += `${cSplitter[j]}_`
                    
                    //trim trailing '_'
                    tempName = tempName.substring(0, tempName.length -1)
                    traitId = `eTrait_${tempName}`
                    let formatter = name.replace(": +%", " Increase")
                    tName = `When equipped character is character type ${formatter}`
                    // effect  = tName
                }
                else
                    continue
                trait = {
                    id: traitId,
                    name: tName,
                    // effect: effect
                }
            }

            //compile medal list -> start at column 5
            const medals = []
            for (let j = 4; j< splitter.length; j++) {
                if(i < 372 ) { // primary traits
                    if(splitter[j] && splitter[j].toLocaleUpperCase() == "X")
                    medals.push(j)
                } 
                else
                if(splitter[j] && isNumeric(splitter[j])) {
                    if (i < 376) { //generic
                        trait.min = 3.5
                        trait.max = 14
                    }
                    else if (i > 375 && i < 399) { //status traits
                        trait.min = 6
                        trait.max = 36
                    }
                    else { //character types
                        trait.min = 14
                        trait.max = 18
                    }
                    
                    medals.push(j)
                }
            }
            trait.medals = medals
            traits.push(trait)
        }
    }
    catch(e) {throw e}
    return traits
}
function compileMedals() {
    let medals =[]
    
    //spreadsheet alignment
    for(let k = 0; k < 4; k++) {
        medals.push({}) //push empty
    }

    try {
        const data = fs.readFileSync(medalData, 'utf-8')
        const rows = data.split(/\r?\n/)
        const nameRow = rows[0].split(',')
        const numRow = rows[1].split(',')
        const idRow = rows[2].split(',')
        for(let i = 4; i < nameRow.length; i++) {
            const medal = {
                name: nameRow[i],
                image: `img_icon_medal_${numRow[i]}`,
                id: idRow[i],
                tags: [],
                extra_traits: []
            }
            medals.push(medal)
        }
    }
    catch(e) {throw e}
    return medals
}
function mapTraits(medals, traitFile, traitFlag) {
    const data = fs.readFileSync(`./src/data/output/${traitFile}`);
    const traits = JSON.parse(data)
    for(let i = 0; i < traits.length; i++) {
        const trait = traits[i]
        console.log(`TRAIT: ${trait.id}`)
        for(let j = 0; j < trait.medals.length; j++) {
            const medal = medals[trait.medals[j]];
            if(traitFlag == "p")
                medals[trait.medals[j]].primary = trait.id
            else if (traitFlag == "e"){
                console.log(trait.medals[j])
                medals[trait.medals[j]].extra_traits.push(trait.id)
            }
            else if(traitFlag == "t")
                medals[trait.medals[j]].tags.push(trait.id)
        }
    }
    return medals
}
function getMappedMedals(row) {
    //compile medal list -> start at column 5
    const medals = []
    for (let j = 4; j< row.length; j++) {
        if(row[j]) 
            medals.push(j)
        
    }
    return medals
}
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
function categorizeMedals(traitFile, traitType) {
    const data = fs.readFileSync(`./src/data/output/${traitFile}`, 'utf-8')
    const traits = JSON.parse(data)
    let categories = []
    let extra = []
    let primary = []
    let tag = []
    //primary traits categories to be mapped
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
        // ["singsing", "sing-sing"],
        ["speed", "speed"]
    ]
    //create category object
    let pCategories = []
    for(let i = 0; i < pTraits.length; i++) {
        pCategories.push({Category: pTraits[i][1], medals:[]})
    }
        
    
    for(let i = 0; i < traits.length -1; i++) {
        const splitter = traits[i].id.split('_')
        if(traitType === "extra") {
            // console.log(i)
            //base & status
            if(i < 24) {
                extra.push({Category: splitter[splitter.length-1], medals: traits[i].medals})
            }
            // else if (i > 3 && i < 27) { //status
            //     extra.push({name: splitter[splitter.length-1], medals: traits[i].medals})
            // }
            else if (i > 23 && i < 144) {// character types
                let temp = ""
                for (let j = 1; j < splitter.length - 1; j++) {
                    temp += j < splitter.length -2 ? `${splitter[j]} ` : splitter[j]
                }
                // console.log(traits[i].id, traits[i+1].id, traits[i+2].id)
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
function printMedals(medalFile) {
    const data = fs.readFileSync(`./src/data/output/${medalFile}`);
    const medalData = JSON.parse(data)
    let medals = []
    for(let i = 0; i < medalData.length; i++) {
        let medal = {
            index: i,
            name: medalData[i].id,
            traits: medalData[i].extra_traits 
        }
        medals.push(medal)
    }
    return medals

}