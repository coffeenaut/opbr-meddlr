
const Card = (props) => {

    return (
        <>
        <div className="relative flex flex-col align-center card">
            {props.children}
        </div>
        </>
    )
}
export default Card