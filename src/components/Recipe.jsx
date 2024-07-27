import picture from "../assets/img/dough.jpg"
const Recipe = (props) => {
    const Content = (props) => {
        const Pictures = () => {
            return (
                <>
                <div className="carousel">
                    <img className="scale-75" src={picture} />
                </div>
                </>
            )
        }
        const Instructions = props.recipe.steps.map((step, i) => {
            return (
                <>
                    <div className="recipeStep">
                       {i + 1}. {step}
                    </div>
                </>    
            )
        })
        const Ingredients = props.recipe.ingredients.map( ingredient => {
            return (
                <>
                    <div className="flex justify-between">
                        <div className="flex"><div className="font-bold px-4 bullet">•</div><div>{ingredient.quantity}</div></div>
                        <div>{ingredient.name}</div>
                    </div>
                </>
            )
        })
        return (
            <>
                <div className="w-full border rounded-lg content">
                    <Pictures />
                </div>
                <div className="w-full articleText">
                    {props.recipe.description}
                </div>
                <div className="w-full flex flex-col ingredientList">
                    {Ingredients}
                </div>
                <div className="w-full flex flex-col recipeInstructionSet articleText">
                    {Instructions}
                </div>
            </>
        )
    }
    return (
        <>
            <div className="flex w-full flex-col">
               <Content recipe={props.recipe}/>
            </div>
            {props.children}
        </>
    )
}

export default Recipe