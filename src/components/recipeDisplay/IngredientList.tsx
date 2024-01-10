import Ingredient from "./Ingredient";
import './IngredientList.scss';

function IngredientList({ ingredients }: IIngredientList) {
    return (
        <ul>
            {ingredients.map((ingredient,idx)=>{
                return (
                <div key={idx}>
                    <Ingredient
                        ingredient={ingredient}
                    />
                </div>)
            })}
        </ul>
    )
}

export default IngredientList;