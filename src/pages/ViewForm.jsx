import {useState} from 'react'
import {useParams} from 'react-router-dom'
import Form from '../components/Form'
const ViewForm = (props) => {
    let {formName, formId, recordId} = useParams()
    // const theForm = new URL(`/src/data/forms/${formName}-${formId}.json`, import.meta.url)
    const [formData, setFormData] = useState({})
    const formInfo = import (`../data/forms/${formName}-${formId}.json`)
    .then ((res) => setFormData(res.default))
    const formFields = formData.map( field => {
        console.log(field.id)
    })
    return (
        <>
        {formFields}
        {/* <Form fields={formData} type="text" /> */}
        </>
    )
}
export default ViewForm