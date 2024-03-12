import { useCookbook } from "../../helpers/cookbookContext";
import RecipeList from "../recipeDisplay/RecipeList";

function CookbookRecipesList(){
    const {cookbook} = useCookbook()

    return (
        <RecipeList recipes={cookbook}/>
    )
}

export default CookbookRecipesList