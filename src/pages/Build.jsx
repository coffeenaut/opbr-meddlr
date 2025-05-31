import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect'
import { lazy, useState, useRef, Suspense } from 'react'
import copy from 'copy-to-clipboard'
import BookmarkIcon from '@heroicons/react/20/solid/BookmarkIcon'
import IconStack from '../components/IconStack';
import XIcon from '@heroicons/react/20/solid/XMarkIcon'
import ShareIcon from '@heroicons/react/20/solid/ShareIcon'
import ClipboardIcon from '@heroicons/react/20/solid/ClipboardIcon'
import MedalSet from '../components/MedalSet'
import TraitList from '../components/TraitList'
// import MedalList from '../components/MedalList'
import MedalView from '../components/MedalView';
import Spinner from '../components/Spinner';
import { isObjectEmpty, IntToHex, Timeout } from '../util/tools';
import { GetMedalIndexById, GetMappedTraitKey } from '../util/medalStore';
import MiniMedalSet from '../components/MiniMedalSet';
const MedalList = lazy(() => import('../components/MedalList'))
const Builder = () => {
  const [medals, setMedals] = useState([{}, {}, {}])
  const [selectedMedal, setSelectedMedal] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [showSideLeft, setShowSideLeft]= useState(false)
  const [showFocusDrop, setShowFocusDrop]= useState(false)
  const [showSaveDrop, setShowSaveDrop] = useState(false)
  const [animateClipboard, setAnimateClipboard] = useState(false)
  const shareLink = useRef("")
  const [setName, setSetName] = useState("")
  const [sLinkwTraits, setsLinkwTraits] = useState(true)
  const savedMedals = () => {
    let saves = []
    for(let key in localStorage) {
      let sMedal = JSON.parse(localStorage.getItem(key))
      // console.log(JSON.parse(sMedal))
      if(!isObjectEmpty(sMedal)) {
        let temp = {name: key, medals: sMedal}
        saves.push(temp)
      }
    }
    return saves
  }
  const [storedMedals, setStoredMedals] = useState(savedMedals)
  const medalSelected = (medal, target) => {
    if(isMedalValid(medal.id)){
      setMedals(med => {
        return med.map( (m,i) => {
          return i === target.position ? medal : m
        })
      })
    }
    else
      console.log("medal already exists in set")
  }
  function isMedalValid(medalid) {
    let valid = true
    let m = medals
    for(let i = 0; i < m.length; i++) {
      if(m[i])
        if(m[i].id === medalid) {
          valid = false
          break
        }
        
    }
    return valid
  }
  function deleteMedal (position) {
    setMedals(med => {
      return med.map( (m,i) => {
        return i === position ? {} : m
      })
    })
  }
  async function copyToUClipboard() {
    setAnimateClipboard(true)
    copy(shareLink.current);
    await Timeout(1000)
    setAnimateClipboard(false)

}
  function isMedalSetEmpty() {
    let isEmpty = true;
    for(let i =0; i < medals.length; i++)
      if(!isObjectEmpty(medals[i])) {
        isEmpty = false
      }
    return isEmpty
  }
  function editMedal(position) {
    setSelectedMedal({
      ...medals[position],
      position: position
    })
    setShowModal(true)
  }
  function updateMedal(traits, values, pos) {
    const tempMedals = medals.map((m, i) => {
      if(i == pos) {
        return {...m, set_traits: traits, set_traits_values: values}
      }
      else
        return m
    })
    setMedals(tempMedals)
    closeModalWindow()
  }
  function saveSet() {
    setSetName(setName)
    localStorage.setItem(setName, JSON.stringify(medals))
    setStoredMedals(savedMedals)
  }
  function toggleSaveDrop() {
    setShowSaveDrop(!showSaveDrop)
  }
  function closeModalWindow() {
    setShowModal(false)
  }
  function toggleSideMenu() {

    setShowSideLeft(!showSideLeft)
  }
  async function toggleFocusDrop() {
    console.log(JSON.stringify(medals))
    setShareUrl(true)
    setShowFocusDrop(!showFocusDrop)
  }
  function loadSet(set, name) {
    setSetName (name)
    setMedals(set)
    toggleSideMenu()
  }
  function deleteStoredMedal(name) {
    localStorage.removeItem(name)
    setStoredMedals(savedMedals)
  }
  function setShareUrl(includeTraits) {
    const relativePath = import.meta.env.VITE_site_path
    let medalLink = `/${relativePath}/#/share?medals=`
    let t1 = ""
    let t2 = ""
    let t3 = ""
    for(let i = 0; i < medals.length; i++) {
      if(!isObjectEmpty(medals[i])) {
        let medalIndex = GetMedalIndexById(medals[i].id)
        medalLink += i > medals.length -2 ? IntToHex(medalIndex) : `${IntToHex(medalIndex)}g`
      }
    }
    if(includeTraits) {
      for(let i = 0; i < 3; i++) {
        if(!isObjectEmpty(medals[0])) {
          t1 += lookupUrlEncodedMappedTrait(medals[0].set_traits[i], medals[0].set_traits_values[i])
        }
        else {
          t1+= "zz"
        }
        if(!isObjectEmpty(medals[1])) {
          t2+= lookupUrlEncodedMappedTrait(medals[1].set_traits[i], medals[1].set_traits_values[i])
        }
        else {
          t2 += "zz"
        }
        if(!isObjectEmpty(medals[2])) {
         t3 += lookupUrlEncodedMappedTrait(medals[2].set_traits[i], medals[2].set_traits_values[i])
        }
        else {
          t3+= "zz"
        }
      }
    }
    function lookupUrlEncodedMappedTrait (traitIndex, traitValue) {
          const encode = GetMappedTraitKey(traitIndex, traitValue)
          if(encode)
            return encode
          else
            return "zz"
    }
    const t = "&t=" + t1 + t2 + t3
    const hrefBuilder = window.location.href.substring(0, window.location.href.indexOf(window.location.pathname))
    shareLink.current = hrefBuilder + medalLink +t
  }
    return (
      <Suspense fallback={<Spinner />}>
        <div className="flex">
            <div className='flex flex-col'>
              <div className='justify-center items-center side-icon-tab'>
                {/* <BookmarkIcon className='sidecon' onClick={toggleSideMenu}/> */}
                <IconStack icon={BookmarkIcon} clicked={toggleSideMenu} />
                <ShareIcon className='sidecon' onClick={toggleFocusDrop} />
              </div>
              <div className={`flex fixed flex-col items-end focus-dropdown ${showFocusDrop && "drop-appear"}`}>
                <div className='flex w-full justify-between'>
                <div className="flex flex-row toolbar">
                  <input className='rounded-sm transparent' type='checkbox' checked={sLinkwTraits} onChange={(e) => 
                    {
                      setsLinkwTraits(e.target.checked)
                      setShareUrl(e.target.checked)
                    }}
                    /><span className="text-xs px-1">include traits</span>
                </div>
                <XIcon className='cursor-pointer -translate-y-2 icon-small-grey' onClick={(e) => {
                  toggleFocusDrop()
                  e.currentTarget.classList.remove("flash-slow")
                  }
                }/>
                </div>
                <div className="flex items-center p-0">
                  <ClipboardIcon className={`rounded-xl cursor-pointer icon-small-primary ${animateClipboard ? "flash-slow" : ""}`} onClick={copyToUClipboard}/>
                  <input className='rounded-lg' ref={shareLink} value={shareLink.current} readOnly={true} />
                </div>
              </div>
            </div>
            <div className={`flex flex-col gap-y-2 rounded-md phalange ${showSideLeft && "show-phalange"}`}>
              {
                storedMedals.length > 0 ? storedMedals.map( (s,i) => {
                  return (<MiniMedalSet emitLoad={loadSet} deleteSet={deleteStoredMedal} medals={s.medals} name={s.name} key={i} />)
                })
                :
                <div class="text-primary text-center py-10">You have no medals saved</div>
              }
            </div>
          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            <div className={`flex flex-col overflow-hidden lg:overflow-x-auto md:flex-row justify-center rounded-md p-2 gap-4 w-full main-content ${showSideLeft &&' push-right-xl'}`}>
              <div id="medal-set-card" className="flex flex-col max-h-[400px] md:max-h-[650px] lg:max-[800px] gap-y-4 cutTop">
                <div className={`absolute h-4/6 h-3/4 md:h-3/5 z-20 modal ${showModal? "showModal" : "hideModal"}`}>
                  <MedalView edit={true} saveMedalTraits={updateMedal} medal={selectedMedal} closeWindow={closeModalWindow}></MedalView>
                </div>
                <div className={`flex flex-col fixed justify-end translate-x-32 translate-y-12 focus-dropdown ${showSaveDrop ? "drop-appear" : ""}`}>
                    <div className='flex justify-between'><span className='text-primary'>Set name</span><XIcon className='-translate-y-2 cursor-pointer icon-small-grey' onClick={toggleSaveDrop}/></div>
                    <input className="rounded-md" value={setName} onChange={e => setSetName(e.target.value)} />
                    <div className='py place-self-center clickable-button' 
                        onClick={ () => {
                        saveSet()
                        toggleSaveDrop()
                        }
                    }>Save</div>
                </div>
                <MedalSet emitSaveDrop={toggleSaveDrop}  modifyMedal={editMedal} removeMedal={deleteMedal} medals={medals}></MedalSet>
                <TraitList medals={medals}></TraitList>
              </div>
              <div className='lg:w-1/2 max-h-[375px] md:max-h-[650px] lg:max-h-[700px] overflow-y-auto'>
                <Suspense fallback={<Spinner />}>
                  <MedalList dropped={medalSelected}></MedalList>
                </Suspense>
              </div>
            </div>
          </DndProvider>
        </div>
      </Suspense>
      
    )
  };
  
  export default Builder;
  