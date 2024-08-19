const NotFound = (props) => {

    return (
        <>
        <div className="flex flex-col justify-center items-center w-full gap-6">
            <div className="notfound-header">404</div>
            <img src="/opbr-meddlr/emptyChest.svg" />
            <div className="flex w-3/4 lg:w-1/2 notfound-text">{ props.message !== undefined ? props.message : "The page you are looking for is not here."}</div>
        </div>
        </>
    )
}
export default NotFound