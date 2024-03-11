import { useCookbook } from "../../helpers/cookbookContext";
import RecipeList from "../recipeDisplay/RecipeList";

type props={
    username:string;
}

function CookbookRecipesList(){
    const {cookbook} = useCookbook()

    return (
        <RecipeList recipes={cookbook}/>
    )
}

export default CookbookRecipesList