const Form  = (props) => {
    const fields = props.fields
    const fieldType = {
        Number: "number",
        Text: "text",
        Password: "password",
        Date: "date"
    }
    // const gridLength = `grid-cols-${fields.length + 3} `
    function getInputType (inputType) {
        let type = fieldType.Text //default
        if (inputType == fieldType.Number)
            type = fieldType.Number
        else if (inputType == fieldType.Password)
            type = fieldType.Password
        else if (inputType == fieldType.Date)
            type = fieldType.Date

            return type
    }
    const InputField = (props) => {
        let input = ""
        const type = getInputType(props.type)
        return (
            <>
                {/* (type === fieldType.Display ? <div className="text-xl font-bold"> {props.field}</div> : <div className="col-span-2"><input className="w-full rounded-md formField" type={type} /></div> ) */}
                <div className="container-input">
                    <div className="input-label"> {props.field}</div>
                    <div className="input-field"><input className="form-input w-full rounded-md " type={type} /></div>
                </div>
            </>
        )
    }
    const formFields = props.fields.map (field => {
        return (
            <>
                <InputField type={field.type} field={field.name} />
            </>
        )
    })
    return (
        <>
        <div className="flex w-full shadow-lg rounded-md">
            <div className={"grid w-full gap-2 grid-cols-3"} >
                {formFields}
            </div>
        </div>
        </>
    )
}
export default Form