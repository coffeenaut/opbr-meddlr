
import {useNavigate} from 'react-router-dom'
import {useRef, useState, useEffect, lazy} from 'react'
import Table from '../components/Table'
import forms from '../data/forms.json'
import Card from '../components/Card'
import Closer from '../components/Closer'
import DetailIcon from '@heroicons/react/20/solid/IdentificationIcon'
import { data } from 'autoprefixer'

const FormList = () => {
    const [displayMiddlePanel, setDisplayMiddlePanel] = useState(false)
    const [displayEndPanel, setDisplayEndPanel] = useState(false)
    const fileData = useRef()
    const [userData, setUserData] = useState([])
    const [userDetail, setUserDetail] = useState([])
    const navigate = useNavigate()
    let list = []
    const formList = forms.map(form => {
        list.push([form.name])
    })
    const EditEvent = (e) => {
        const formid = e.target.id;
        const formMeta = formid.split('-')
        console.log(formMeta)
        // navigate(`/form/${formName[0]}/${formMeta[0]}/${formMeta[1]}`)
    }
    const ItemEvent = (e) => {
        let itemMeta = e.split('-')
        import(`../data/${itemMeta[0]}.json`)
            .then((res) => {
                let datarray = []
                fileData.current = res.default;
                fileData.current.users.map((user) => {
                    datarray.push([user.username])
                })
                setUserData(datarray)
            })
            .catch(_ => setUserData([]));
        setDisplayMiddlePanel(true)
    }
    const DataItemClick = (e) => {
        const itemMeta = e.split('-')
        if(fileData.current) {
            let details = (fileData.current.users[itemMeta[1]])
            setUserDetail(Object.entries(details))
        }
        setDisplayEndPanel(true)
        // console.log(itemMeta[1])
    }
    return (
    <>
        <div className="flex flex-col lg:flex-row gap-x-2 w-full">
            <div className="lg:w-1/3 dataPanel">
                <Table items={list} fields={['name']} EditItem={EditEvent} ItemClick={ItemEvent} useActions={["edit", "item"]}/>
            </div>
            <div className={"lg:w-1/3 dataPanel animationPanel " + (displayMiddlePanel ? "flyRight" : "") } >
                <Closer CloseClick={() => setDisplayMiddlePanel(false) } />
                <Table items={userData} fields={['username']} ItemClick={DataItemClick} useActions={["item"]}/>
                
            </div>
            <div className={"lg:w-1/3 dataPanel animationPanel " + (displayEndPanel ? "flyRight" : "") } >
                <Closer CloseClick={() => setDisplayEndPanel(false) } />
                <Table items={userDetail} fields={['property', 'value']} useActions={["item"]}/>
            </div>
        </div>
    </>
    )
}
export default FormList