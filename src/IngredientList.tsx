import Ingredient from "./Ingredient";

function IngredientList({ ingredients }: IIngredientList) {
    return (
        <ul>
            {ingredients.map((i)=>{
                return (
                <li>
                    <Ingredient
                        ingredient={i}
                        key={i.ingredientId} />
                </li>)
            })}
        </ul>
    )
}

export default IngredientList;