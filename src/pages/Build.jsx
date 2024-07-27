import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect'
import { lazy, useState, useRef, Suspense } from 'react'
import copy from 'copy-to-clipboard'
import BookmarkIcon from '@heroicons/react/20/solid/BookmarkIcon'
import XIcon from '@heroicons/react/20/solid/XMarkIcon'
import ShareIcon from '@heroicons/react/20/solid/ShareIcon'
import ClipboardIcon from '@heroicons/react/20/solid/ClipboardIcon'
import MedalSet from '../components/MedalSet'
import medalData from '../data/output/medals1.json'
import TraitList from '../components/TraitList'
// import MedalList from '../components/MedalList'
import MedalView from '../components/MedalView';
import Spinner from '../components/Spinner';
import { isObjectEmpty, IntToHex, Timeout } from '../util/tools';
import { GetMedalIndexById } from '../util/medalStore';
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
    console.log(tempMedals)
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
  function toggleFocusDrop() {
    setShareUrl()
    setShowFocusDrop(!showFocusDrop)
  }
  function toggleIncludeTraits(e) {
    setsLinkwTraits(e.target.checked)
    setShareUrl()
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
  function setShareUrl() {
    const relativePath = import.meta.env.VITE_site_path
    let medalLink = `/${relativePath}/#/share?medals=`
    let t1 = "&t1="
    let t2 = "&t2="
    let t3 = "&t3="
    for(let i = 0; i < medals.length; i++) {
      if(!isObjectEmpty(medals[i]))
        medalLink += i > medals.length -2 ? IntToHex(GetMedalIndexById(medals[i].id)) : `${IntToHex(GetMedalIndexById(medals[i].id))}g`
    }
    if(sLinkwTraits) { //workaround, but input check is backwards false == true
      for(let i = 0; i < 3; i++) {
        if(!isObjectEmpty(medals[0])) {
          let index =  medals[0].set_traits.findIndex(t => t === medals[0].set_traits[i])
          t1 += `${index}:${medals[0].set_traits_values[i]}`
        }
        if(!isObjectEmpty(medals[1])) {
          let index =  medals[1].set_traits.findIndex(t => t === medals[1].set_traits[i])
          t2 += `${index}:${medals[1].set_traits_values[i]}`
        }
        if(!isObjectEmpty(medals[2])) {
          let index =  medals[2].set_traits.findIndex(t => t === medals[2].set_traits[i])
          t3 += `${index}:${medals[2].set_traits_values[i]}`
        }
      }
    }
    const hrefBuilder = window.location.href.substring(0, window.location.href.indexOf(window.location.pathname))
    shareLink.current = hrefBuilder + medalLink +t1 + t2 + t3
  }
    return (
      <div className="flex">
        <div className='flex flex-col'>
          <div className='justify-center items-center side-icon-tab'>
            <BookmarkIcon className='sidecon' onClick={toggleSideMenu}/>
            <ShareIcon className='sidecon' onClick={toggleFocusDrop} />
          </div>
          <div className={`flex fixed flex-col items-end focus-dropdown ${showFocusDrop && "drop-appear"}`}>
            <div className='flex w-full justify-between'>
            <div className="flex flex-row toolbar">
              <input className='rounded-sm transparent' type='checkbox' checked={sLinkwTraits} onChange={toggleIncludeTraits}/><span className="text-xs px-1">include traits</span>
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
        <div className={`flex flex-col overflow-hidden lg:overflow-x-auto md:flex-row justify-center rounded-md p-2 gap-4 w-full main-content ${showSideLeft &&' push-right'}`}>
          <div className="flex flex-col max-h-[400px] md:max-h-[650px] gap-y-4 cutTop">
            <div className={`absolute h-4/6 lg:h-1/2 z-20 modal ${showModal? "showModal" : "hideModal"}`}>
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
          <div className='lg:w-1/2 cutTop'>
            <Suspense fallback={<Spinner />}>
              <MedalList dropped={medalSelected}></MedalList>
            </Suspense>
          </div>
        </div>
      </DndProvider>
    </div>
    )
  };
  
  export default Builder;
  