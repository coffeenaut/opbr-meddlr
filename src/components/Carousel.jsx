import {useState} from 'react'
import ChevronLeft from '@heroicons/react/20/solid/ChevronLeftIcon'
import ChevronRight from '@heroicons/react/20/solid/ChevronRightIcon'
import { DiceRoll } from '../util/tools'
const Carousel = (props) => {
    const [currentIndex, setCurrentIndex] = useState(DiceRoll(props.cards.length -1))
    const [slideLeft, setSlideLeft] = useState(false)
    const [slideRight, setSlideRight] = useState(false)
    const cards = props.cards;
    const cardsLimit = cards.length -1
    const paginator = [...Array(cards.length)].map((x, i) => {
        return (
            <>
                <div className={"z-50 pageIndicators " + (currentIndex == i ? "active-page" : "")}></div>
            </>
        )
    })
    function incrementIndex() {
        setSlideRight(true)
        if(currentIndex == cardsLimit)
            setCurrentIndex(0)
        else
            setCurrentIndex(currentIndex + 1)

        setTimeout( () => {
            setSlideRight(false)
        }, 250)
    }
    function decrementIndex() {
        setSlideLeft(true)
        if (currentIndex == 0) 
            setCurrentIndex(cardsLimit)
        
        else 
            setCurrentIndex(currentIndex -1)
        
        //animate
        setTimeout( () => {
            setSlideLeft(false)
        }, 250)
    }
    return (
        <>
            <div className="flex flex-col w-full items-center">
                <div className="flex w-full items-center">
                    <div><ChevronLeft className="cursor-pointer icon-medium-grey hover:fill-gray-300" onClick={decrementIndex}></ChevronLeft></div>
                    <div className={"w-full relative carouselContainer" + (slideLeft ? " slideLeft fade" : "") + (slideRight ? " slideRight fade" : "")}>{cards[currentIndex]}</div>
                    <div><ChevronRight className="cursor-pointer icon-medium-grey hover:fill-gray-300" onClick={incrementIndex}></ChevronRight></div>
                </div>
                <div className="flex gap-x-2 -translate-y-4 items-center justify-evenly z-20">
                    {paginator}
                </div>
            </div>
        </>
    )

}
export default Carousel