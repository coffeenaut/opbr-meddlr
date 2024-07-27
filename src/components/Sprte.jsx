import Images from '../assets/images.svg'

const Sprite = (props) => {
    return (<svg height="100" width="100"><use href={`${Images}#${props.sid}`} className={props.className} /></svg> )
}
export default Sprite