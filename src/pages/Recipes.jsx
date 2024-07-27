import {useState, useEffect} from 'react'
import recipeInfo from '../data/articles.json'
import Recipe from '../components/Recipe'
import PageTableContents from '../components/PageTableContents';


const Recipes = () => {
    const recipeData = recipeInfo
    const recipe = recipeData[0];
    const getHeadingsData = () => {
        const [nestedHeadings, setNestedHeadings] = useState([]);
        useEffect(() => {
        const headingElements = Array.from(
            document.querySelectorAll("h2, h3")
        );
    
        // Created a list of headings, with H3s nested
        const newNestedHeadings = getNestedHeadings(headingElements);
        setNestedHeadings(newNestedHeadings);
        }, []);
    
        return { nestedHeadings };
    };
    const getNestedHeadings = (headingElements) => {
        const nestedHeadings = [];
    
        headingElements.forEach((heading, index) => {
        const { innerText: title, id } = heading;
    
        if (heading.nodeName === "H2") {
            nestedHeadings.push({ id, title, items: [] });
        } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
            nestedHeadings[nestedHeadings.length - 1].items.push({
            id,
            title
            });
        }
        });
    
        return nestedHeadings;
    };
  const { nestedHeadings } = getHeadingsData()
  const DummyText = "Start a New React Project If you want to build a new app or a new website fully with React, we recommend picking one of the React-powered frameworks popular in the community Frameworks provide features that most apps and sites eventually need, including routing, data fetching, and generating HTML.NoteYou need to install Node.js for local development. You can also choose to use Node.js in production, but you don’t have to. Many React frameworks support export to a static HTML/CSS/JS folder."
    return (
        <>
        <div className='grid grid-cols-4 gap-x-4'>
            <div className='flex col-span-3'>
            <div className="max-h-[80vh] overflow-scroll px-4">
                <main>
                <Recipe recipe={recipe} />
                <h2 id="initial-header">Initial header</h2>
                <p className="text-xl p-30">{DummyText}</p>
                <h2 id="second-header">Second header</h2>
                <p>{DummyText}</p>
                <h3 id="third-header">Third header</h3>
                <p>{DummyText}</p>
                <p>{DummyText}</p>
                <h2 id="fourth-header">Fourth header</h2>
                <p>{DummyText}</p>
                <p>{DummyText}</p>
                <p>{DummyText}</p>
                <p>{DummyText}</p>
                <h3 id="fifth-header">Fifth header</h3>
                <p>{DummyText}</p>
                <p>{DummyText}</p>
                </main>
                
            </div>
            </div>
            <div className='flex col-span-1'>
                <PageTableContents nestedHeadings={nestedHeadings} />
            </div>

        </div>
        
        </>
    )
  };
  
  export default Recipes;
  