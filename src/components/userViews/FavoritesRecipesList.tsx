import { useFavorites } from "../../helpers/favoritesContext";
import RecipeList from "../recipeDisplay/RecipeList";

function FavoritesRecipesList(){
    const {favorites} = useFavorites()

    return (
        <RecipeList recipes={favorites}/>
    )
}

export default FavoritesRecipesList