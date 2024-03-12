import { useUserRecipes } from "../../helpers/userRecipesContext";
import RecipeList from "../recipeDisplay/RecipeList";

function UserRecipesList(){
    const userRecipes = useUserRecipes()

    return (
        <RecipeList recipes={userRecipes}/>
    )
}

export default UserRecipesList