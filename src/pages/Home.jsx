import Card from "../components/Card";
import Carousel from "../components/Carousel";
import MedalStack from "../components/MedalStack";
import MiniMedalSet from "../components/MiniMedalSet";
import TraitList from "../components/TraitList";
import TabPanel from "../components/TabPanel";
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import BookIcon from '@heroicons/react/20/solid/BookOpenIcon'
import BookmarkIcon from '@heroicons/react/20/solid/BookmarkIcon'
import FilterIcon from '@heroicons/react/20/solid/AdjustmentsHorizontalIcon'
import PlusIcon from '@heroicons/react/20/solid/PlusIcon'
import { GetPresetsByCategory, GetPresetCategories, GetRandomPresetMedal } from "../util/medalStore";
import { isObjectEmpty, DiceRoll, Timeout } from "../util/tools";
const Home = () => {
  const checkScreenSize = () => {
    let small = true
    if(window.innerWidth < 1024)
      small = false
      
    return small
  }
  const initialMedal = GetRandomPresetMedal()
  const [displaySide, setDisplaySide] = useState(checkScreenSize())
  const [setName, setSetName] = useState(initialMedal.name)
  const [medals, setMedals] = useState(initialMedal.medals)
  const [isCurrentSetSaved, setIsCurrenSetSaved] = useState(false)
  const [animateFade, setAnimateFade] = useState(false)
  const categories = GetPresetCategories()
  const [currentCategory, setcurrentCategory] = useState(categories[DiceRoll(categories.length -1)])
  async function loadSet (set) {
    setAnimateFade(true)
    setSetName (set.name)
    setMedals(set.medals)
    setDisplaySide(false)
    await Timeout(1000)
    setAnimateFade(false)

  }
  const MedalSet = (prop) => {
    let filter = prop.filter
    let aMedals = []
    if(filter)
       aMedals = GetPresetsByCategory(filter)
    function loadMedalSet(medals, name) {
      prop.emitLoadSet({medals: medals, name: name})
    }
    return (
            aMedals.map((attacker, i) => {
              return( <MiniMedalSet emitLoad={loadMedalSet} medals={attacker.medals} name={attacker.name} deleteSet={false} /> )
            })
  )}
  function toggleSidePanel () {
    setDisplaySide(!displaySide)
  }
  function saveSet () {
    localStorage.setItem(setName, JSON.stringify(medals))
    setIsCurrenSetSaved(true)
  }
  
  //page components
  const RolesPane = () => {
    const roles = ["runner", "attacker", "defender"]
    return (
      <>
      <div className="flex flex-col w-full">
          <div className="flex flex-col gap-y-4 side-panel">
            {
              roles.map((role) => {
                return (
                  <>
                  <div>
                    <div className="category-divide capitalize">{role}</div>
                    <div className="w-full">
                        <Carousel cards={MedalSet({filter: role, emitLoadSet: loadSet})}></Carousel>
                    </div>
                  </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </>
    )
  }
  const FilterPane = () => {
    return (
      <>
      <div className="flex-col max-h-full">
          <div className="flex flex-col gap-y-4 side-panel">
              <select className="flex w-full rounded-lg form-input" 
                value={currentCategory}
                name={currentCategory}
                onChange={e => {
                    // const options = [...e.target.selectedOptions]
                    // const values = options.map(option => option.value)
                    setcurrentCategory(e.target.value)
                  }}
                >
                    {
                      categories.map((c, i) => {
                          return (<option value={c}>{c}</option>)
                      })
                    }
                </select>
              <div className="flex flex-col gap-y-2 lg:max-h-[600px] overflow-y-scroll">
                  <MedalSet filter={currentCategory} emitLoadSet={loadSet} />
              </div>
          </div>
        </div>
      </>
    )
  }
  useEffect(() => {
      let isSaved = false
      let saves = []
      for(let key in localStorage) {
        let sMedal = JSON.parse(localStorage.getItem(key))
        if(!isObjectEmpty(sMedal)) {
          if(key === setName) {
            isSaved = true;
            break;
          }
        }
      }
      setIsCurrenSetSaved(isSaved)
    }, [setName])

    return (
        <>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <BookIcon className="icon-medium-secondary cursor-pointer" onClick={toggleSidePanel} title="Expand/Collapse Filters"></BookIcon>
            <BookmarkIcon className={`${isCurrentSetSaved ? "sideconFill" : "sidecon"}`} onClick={saveSet} title="Save Current set to Bookmarks" />
          </div>
          <div className={`flex flex-col gap-y-2 rounded-md px-6 phalange ${displaySide && "show-phalange"}`}>
            <TabPanel names={["Roles", "Categories"]} components={[RolesPane, FilterPane]}></TabPanel>
          </div>
            {/* Main window */}
            <div className={`flex w-full md:w-3/4 main-content ${displaySide ? "push-right" : ""}`}>
              {
                medals.length > 0 &&
                <div className={`flex flex-col w-full md:flew-row items-center ${animateFade ? "fade-out" : ""}`}>
                    <div className="flex text-primary">{setName}</div>
                    <div className="flex justify-evenly w-3/4 cutTopPrimary">
                    {
                        medals.length > 0 && medals.map((m,i) => {
                            return <MedalStack medal={m} key={i} />
                        })
                    }
                      {/* <div title="bookmark medal set" class="flex self-end">
                        <BookmarkIcon onClick={saveSet} className='icon-medium-secondary cursor-pointer'/>
                      </div> */}
                    </div>
                    
                    <div className="flex flex-col justify-center w-full md:flex-row items-center">
                        <TraitList medals={medals}/>
                    </div>
                </div>
              }
            </div>
            {/* Main Window End */}
        </div>
        </>
        );
  };
  
export default Home;
  