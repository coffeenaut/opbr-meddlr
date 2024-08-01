import Card from "../components/Card";
import Carousel from "../components/Carousel";
import MedalStack from "../components/MedalStack";
import MiniMedalSet from "../components/MiniMedalSet";
import TraitList from "../components/TraitList";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import BookIcon from '@heroicons/react/20/solid/BookOpenIcon'
import { GetPresetsByCategory, GetPresetCategories } from "../util/medalStore";
import { isObjectEmpty } from "../util/tools";
const Home = () => {
  const [displaySide, setDisplaySide] = useState(false)
  const [setName, setSetName] = useState("")
  const [medals, setMedals] = useState([{}, {}, {}])
  const categories = GetPresetCategories()
  const [currentCategory, setcurrentCategory] = useState(categories[0])
  function loadSet (set) {
    setSetName (set.name)
    setMedals(set.medals)
    setDisplaySide(false)
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
    return (
        <>
        <div className="flex flex-col lg:flex-row justify-start">
          <BookIcon onClick={toggleSidePanel} className={`fixed left-2 top-40 icon-medium-grey cursor-pointer lg:hidden ${displaySide ? "hide" : "show"}`}/>
          <div className={`flex flex-col max-h-[95%] lg:flex-row w-[95%] fixed justify-between z-10 responsive-panel ${displaySide ? "showPanel" : ""}`}>
            <div className="flex-col">
            <div className="flex justify-center">Sets by role</div>
              <div className="flex flex-col gap-y-4 side-panel">
                <div>
                  <div className="category-divide">Runner</div>
                  <div>
                      <Carousel cards={MedalSet({filter: "runner", emitLoadSet: loadSet})}></Carousel>
                  </div>
                </div>
                <div>
                  <div className="category-divide">Attacker</div>
                  <div>
                      <Carousel cards={MedalSet({filter: "attacker", emitLoadSet: loadSet})}></Carousel>
                  </div>
                </div>
                <div>
                  <div className="category-divide">Defender</div>
                  <div>
                      <Carousel cards={MedalSet({filter: "defender", emitLoadSet: loadSet})}></Carousel>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col max-h-[45%] lg: max-h-full">
              <div className="flex justify-center">Categories</div>
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
          </div>
            <div className="flex flex-col w-full">
              {
                medals.length > 0 &&
                <div className={`flex flex-col md:flew-row items-center ${displaySide ? "push-right" : ""}`}>
                    <div className="flex text-primary">{setName}</div>
                    <div className="flex justify-evenly w-full lg:w-1/3 xl:w-1/2  cutTopPrimary">
                    {
                        medals.length > 0 && medals.map((m,i) => {
                            return <MedalStack medal={m} key={i} />
                        })
                    }
                    </div>
                    <div className="flex flex-col justify-center w-full lg:w-1/3 xl:w-1/2 md:flex-row items-center">
                        <TraitList medals={medals}/>
                    </div>
                </div>
              }
            </div>
          </div>
        </>
        );
  };
  
export default Home;
  