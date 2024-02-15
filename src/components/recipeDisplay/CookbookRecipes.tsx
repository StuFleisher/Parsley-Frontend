import { useCookbook } from "../../helpers/cookbookContext";
import RecipeList from "./RecipeList";

type props={
    username:string;
}

function CookbookRecipes(){
    const {cookbook} = useCookbook()

    return (
        <RecipeList recipes={cookbook}/>
    )
}

export default CookbookRecipes