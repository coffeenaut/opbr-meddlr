import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ChanceCalculator = () => {

        const formula_source = "https://calculatorcorp.com/gacha-pull-probability-estimator-calculator/"
        function wacky_round(number, places) {
            var multiplier = Math.pow(10, places+2); // get two extra digits
            var fixed = Math.floor(number*multiplier); // convert to integer
            fixed += 44; // round down on anything less than x.xxx56
            fixed = Math.floor(fixed/100); // chop off last 2 digits
            return fixed/Math.pow(10, places);
        }
        const [calcForm, setCalcForm] = useState({
            rate: 0.02,
            pulls: 5,
            drops: 11
        })
        const [chanceVal, setChanceVal] = useState(10)
        function calcChance () {
            let chance = 1 - ((1 - calcForm.rate * .01)   ** (calcForm.pulls * calcForm.drops))
            chance = (chance * 100).toFixed(2)
            setChanceVal (chance)
        }
        useEffect(() => {calcChance()}, [calcForm])
        return (
            <>
            <div className='flex justify-center font-bold'>Favorable Drop Chance</div>
            <div className='flex justify-center calc-output'>
                {chanceVal}%
            </div>
            <div className='flex justify-evenly gap-x-2'>
                <div className='flex flex-col'>
                    <div className='calc-fieldName' title="drop rate listed on choice favorable character">Rate x </div>
                    <div><input type="number" className='calc-input' value={calcForm.rate}
                        onChange={e => {
                            setCalcForm({
                            ...calcForm,
                            rate: e.target.value
                            });
                        }}/>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='calc-fieldName' title="number of planned pulls">Pulls x</div>
                    <div><input type="number" className='calc-input' value={calcForm.pulls}
                        onChange={e => {
                            setCalcForm({
                            ...calcForm,
                            pulls: e.target.value
                            });
                        }}/></div>
                    </div>
                <div className='flex flex-col'>
                    <div className='calc-fieldName' title="number of drops per pull">Drops x</div><div>
                        <input  type="number" className='calc-input' value={calcForm.drops}
                            onChange={e => {
                                setCalcForm({
                                ...calcForm,
                                drops: e.target.value
                                });
                            }}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='flex justify-center primary-tag form-seperator'>Formula used</div>
                <div className='flex justify-center calc-formula'>
                    1 - (1 - {calcForm.rate }%)<sup>({calcForm.pulls} x {calcForm.drops})</sup>
                </div>
                <div className='flex flex-col calc-footnote'>
                    <div>Chance of winning 1 or more times when drawing {calcForm.pulls * calcForm.drops}</div>
                    <div className="flex w-full justify-end"><sub className="annotation">(pulls x drops)</sub></div>
                    <div>character drops with appearance rate {calcForm.rate}% is {chanceVal}%</div>
                    <div className='py-2'>Chance per Pull(x{calcForm.drops}): <span className='calc-fieldName'>{((1 - ((1 - calcForm.rate * .01) ** (calcForm.drops))) * 100).toFixed(2)}%</span></div>
                    <div className="flex justify-center"><Link to={formula_source} target="_blank" rel="noopener noreferrer">Source</Link></div>
                </div>
            </div>
            
            </>
        )
    }
export default ChanceCalculator