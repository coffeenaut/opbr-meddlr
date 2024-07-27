
const Card = (props) => {

    return (
        <>
        <div className="card relative flex flex-col align-center ">
            {props.children}
        </div>
        </>
    )
}
export default Card