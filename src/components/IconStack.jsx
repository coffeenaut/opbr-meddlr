
const IconStack = (props) => {

    const Icon = props.icon
    return (
        <>
        <div className="relative flex cursor-pointer" onClick={props.clicked}>
            <div className="icon-stack-border">
                <div className="icon-stack-border">
                    <Icon className="icon-stack-icon" />
                </div>
            </div>
        </div>
        </>
    )
}
export default IconStack