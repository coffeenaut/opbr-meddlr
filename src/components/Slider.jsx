import { useState } from "react"

const Slider = (props) => {
    const alignment = props.align == "vertical"
    const [sliderValue, setValue] = useState(props.value)
    function updateValue () {
        let nVal = sliderValue + 1
        setValue(nVal)
        props.setInput(sliderValue)
    }
    const valueDisplay = <><div className="flex" id={sliderValue} onClick={updateValue}>{sliderValue}</div></>
    return (
        <>
        <div className={`relative flex flex-col align-center ${alignment && "flex-col"}`} >
            {valueDisplay}
            {props.children}
        </div>
        </>
    )
}
export default Slider