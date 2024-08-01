import {useState} from 'react'
import ChevronLeft from '@heroicons/react/20/solid/ChevronLeftIcon'
import ChevronRight from '@heroicons/react/20/solid/ChevronRightIcon'
const Carousel = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [slideLeft, setSlideLeft] = useState(false)
    const [slideRight, setSlideRight] = useState(false)
    const cards = props.cards;
    const cardsLimit = cards.length -1
    const paginator = [...Array(cards.length)].map((x, i) => {
        return (
            <>
                <div className={"pageIndicators " + (currentIndex == i ? " bg-blue-600" : " bg-gray-300")}></div>
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
            <div className="flex flex-col items-center">
                <div className="flex items-center">
                    <div><ChevronLeft className="icon-medium-grey hover:fill-gray-300" onClick={decrementIndex}></ChevronLeft></div>
                    <div className={"relative carouselContainer" + (slideLeft ? " slideLeft fade" : "") + (slideRight ? " slideRight fade" : "")}>{cards[currentIndex]}</div>
                    <div><ChevronRight className="icon-medium-grey hover:fill-gray-300" onClick={incrementIndex}></ChevronRight></div>
                </div>
                {/* <div className="flex w-1/6 items-center justify-evenly z-20">
                    {paginator}
                </div> */}
            </div>
        </>
    )

}
export default Carousel