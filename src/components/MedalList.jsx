import AdjustmentIcon from '@heroicons/react/20/solid/AdjustmentsHorizontalIcon'
import SearchIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon'

import Medal from '../components/Medal'
import { isObjectEmpty, Timeout } from '../util/tools';
import { GetAllMedals, GetFilters, SearchMedal } from '../util/medalStore'
import {useState,useRef} from 'react'

const MedalList = (props) => {
    const MedalData = GetAllMedals()
    const [medals, setMedals] = useState([ ...Array(MedalData.length).keys() ].map( i => i+4))
    const searchInput = useRef(null)
    function filter(medalList) {
        setMedals([...medalList])
    }
    const Filter = (props) => {
        const [showFilter, setShowFilter] = useState(false)
        const [filters, setFilters] = useState(GetFilters())
        const[hoverOver, setHoverOver] = useState(false)
        function showFilters() {
            setShowFilter(!showFilter)
        }
        function categoryClick(filter) {
            if(filter.sub) {
                setFilters(filter.sub)
            }
            else
                props.filterMedal(filter.medals)
        }
        return (
            <>
                <AdjustmentIcon onClick={showFilters} className='icon-medium-grey cursor-pointer' />
                <div className={`flex flex-col rounded-md absolute filter-drop cursor-pointer max-h-60 overflow-y-auto gap-y-2 ${showFilter ? 'showdrop' : ''}`}>
                    {
                        filters.map((f, i) => {
                            return (
                                <>
                                    <div className={`capitalize}`} 
                                    onMouseEnter={() => setHoverOver(true)} 
                                    onMouseLeave={()=>setHoverOver(false)} 
                                    onClick={() => categoryClick(f)} key={i}>
                                        {f.Category}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </>
        )
    }
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            search()
        }
    }
    function resetMedals() {
        setMedals([ ...Array(MedalData.length).keys() ].map( i => i+4))
    }
    function showMedal(index) {
        return medals.indexOf(index) > -1
    }
    function search() {
        let searchTerm = searchInput.current.value 
        let result = []
        if(searchTerm) {
            result = SearchMedal(searchTerm)
        }
        else {
            console.log("nothing")
        }
        if(result.length > 0) {
            setMedals([...result])
        }
        else {
            resetMedals()
        }
    }
    return (
        <>
        <div className='flex flex-col'>
            <div className='flex p-2 justify-between'>
                <div className='flex w-3/4 lg:w-1/2 search'><input ref={searchInput} onKeyDown={handleKeyPress} className="w-full rounded-lg form-input" type="text" placeholder='search medals'></input><SearchIcon className='-translate-x-9 translate-y-1 icon-medium-grey cursor-pointer' onClick={search}/></div>
                <div className='filter'>
                    <Filter filterMedal={filter}/>
                </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-h-[225px] md:max-h-[450px] lg:max-h-[640px] medal-list">
                {
                    MedalData.map((medal, index) => (
                        !isObjectEmpty(medal) && <div className={`${showMedal(index) ? "show spin-medal" : "hide"}`}><Medal onDrop={props.dropped} key={index} medal={medal} /></div>
                    ))
                }
            </div>
        </div>
        </>
    )
}
export default MedalList