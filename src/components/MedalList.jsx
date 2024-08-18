import AdjustmentIcon from '@heroicons/react/20/solid/AdjustmentsHorizontalIcon'
import SearchIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon'
import ResetIcon from '@heroicons/react/20/solid/ArrowPathIcon'

import Medal from '../components/Medal'
import { isObjectEmpty, Timeout } from '../util/tools';
import { GetAllMedals, GetFilters, SearchMedal, GetCharacterMedalLength } from '../util/medalStore'
import {useState,useRef} from 'react'

const MedalList = (props) => {
    const MedalData = GetAllMedals()
    const characterMedalLength = GetCharacterMedalLength()
    const [medals, setMedals] = useState([ ...Array(MedalData.length).keys() ])
    const searchInput = useRef(null)
    const focusDivert = useRef(null)
    function filter(medalList) {
        //need to add character medal length to event medal to get the right index
        setMedals([...medalList.map(m => typeof m === "string" || m.type === String? parseInt(m.substring(1, m.length)) + characterMedalLength : m)])
    }
    const Filters = (props) => {
        const filterList = GetFilters()
        const [showFilter, setShowFilter] = useState(false)
        const [filterInput, setFilterInput] = useState("")
        const [filters, setFilters] = useState(filterList)
        const[hoverOver, setHoverOver] = useState(false)
        function showFilters() {
            setShowFilter(!showFilter)
        }
        const checkEnter = (e) => {
            if (e.keyCode === 13) {
                e.target.blur()

            }
        }
        const sortCategory = (a, b) => a.Category.localeCompare(b.Category)
        function categoryClick(filter) {
            if(filter.sub) {
                const sortedFilters = filter.sub.sort( (a, b) => a.Category.localeCompare(b.Category))
                setFilters(sortedFilters)
            }
            else
                props.filterMedal(filter.medals)
        }
        function filter(term) {
            const val = term.toLowerCase()
            let nFilters = []
            filterList.forEach( c => {
                nFilters = [...nFilters, ...c.sub.filter((s => s.Category.indexOf(val) > -1))]
            })
            setFilters(nFilters.sort((a, b) => sortCategory(a, b)))
        }
    
        return (
            <>
                <AdjustmentIcon onClick={showFilters} className='icon-medium-grey cursor-pointer' title="Filter Medals" />
                <div className={`flex flex-col rounded-md absolute filter-drop cursor-pointer max-h-60 overflow-y-auto gap-y-2 ${showFilter ? 'showdrop' : ''}`}>
                    <div>
                        <input className="w-full rounded-lg form-input"
                        type="text"
                        value={filterInput} 
                        onKeyDown={checkEnter} 
                        onChange={(e) => {
                            setFilterInput(e.target.value)
                            filter(e.target.value)
                        }} 
                        >
                        </input>
                    </div>
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
        setMedals([ ...Array(MedalData.length).keys() ].map( i => i))
    }
    function showMedal(index) {
        return medals.indexOf(index) > -1
    }
    function search() {
        let searchTerm = searchInput.current.value 
        let result = []
        if(searchTerm) {
            result = SearchMedal(searchTerm)
            console.log(result)
        }
        if(result.length > 0) {
            setMedals([...result])
        }
        else {
            resetMedals()
        }
        //focus off search input
        searchInput.current.blur()
    }
    return (
        <>
        <div className='flex flex-col'>
            <div></div>
            <div className='flex -translate-y-2.5 p-2 fixed justify-between medal-toolbar'>
                <div className='flex w-3/4 lg:w-1/2 search'>
                    <input ref={searchInput} onKeyDown={handleKeyPress} className="w-full rounded-lg form-input" type="text" placeholder='search medals'></input>
                    <SearchIcon className='-translate-x-9 translate-y-1 icon-medium-grey cursor-pointer' onClick={search}/>
                    <ResetIcon className="cursor-pointer icon-medium-tertiary" onClick={resetMedals} title="Reset"/>
                </div>
                <div className='filter'>
                    <Filters filterMedal={filter}/>
                </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 medal-list">
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