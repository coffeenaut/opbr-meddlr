import {useState, useRef, useEffect} from 'react'
import Slider from '../components/Slider';
const Test2 = () => {
    const DummyText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    const [slideValue, setSlide] = useState(1)
    function clicked() {
      console.log(slideValue)
    }
    function handleChange(e) {
      // let newValue = e
      setSlide(e)
    }
    return (
      <div className="flex w-full justify-center items-center">
        <div>
          <Slider setInput={handleChange} value={slideValue}/>
          {slideValue}
          <div className="flex rounded-md border p-2 bg-blue-600 cursor-pointer" onClick={clicked}>Click Me</div>
        </div>
      </div>
      // <div className="w-1/2 max-h-[80vh] overflow-scroll px-4">
      //     <h2 id="initial-header">Initial header</h2>
      //     <p className="text-xl p-30">{DummyText}</p>
      //     <h2 id="second-header">Second header</h2>
      //     <p>{DummyText}</p>
      //     <h3 id="third-header">Third header</h3>
      //     <p>{DummyText}</p>
      //     <p>{DummyText}</p>
      //     <h2 id="fourth-header">Fourth header</h2>
      //     <p>{DummyText}</p>
      //     <p>{DummyText}</p>
      //     <p>{DummyText}</p>
      //     <p>{DummyText}</p>
      //     <h3 id="fifth-header">Fifth header</h3>
      //     <p>{DummyText}</p>
      //     <p>{DummyText}</p>
      // </div>
    );
}

export default Test2