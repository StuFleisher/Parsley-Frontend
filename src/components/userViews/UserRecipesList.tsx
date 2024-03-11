import { useUserRecipes, userRecipesContext } from "../../helpers/userRecipesContext";
import RecipeList from "../recipeDisplay/RecipeList";
import { useContext } from "react";

type props={
    username:string;
}

function UserRecipesList(){
    const userRecipes = useUserRecipes()

    return (
        <RecipeList recipes={userRecipes}/>
    )
}

export default UserRecipesList