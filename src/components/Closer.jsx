import XIcon from '@heroicons/react/20/solid/XMarkIcon'
const Closer = (props) => {
    return (
        <>
        <div className='cursor-pointer flex justify-end' onClick={props.closeClick}><XIcon className="icon-medium-grey" ></XIcon></div>
        </>
    )
}
export default Closer