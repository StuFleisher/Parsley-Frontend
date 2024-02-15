
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import userContext from "../helpers/userContext";
import ParsleyAPI from "../helpers/api";
import RecipeList from "../components/recipeDisplay/RecipeList";

function RecipeListPage() {

    const [recipes, setRecipes] = useState<SimpleRecipeData[]>([]);
    const {username} = useContext(userContext);

    const navigate = useNavigate();
    useEffect(function getRecipesOnMount() {

        async function fetchRecipes() {
            try {
                const recipesData = await ParsleyAPI.getAllRecipes();
                setRecipes(recipesData);
            } catch (err) {
                console.log(err);
                navigate('/');
            }
        }

        fetchRecipes();
    }, [navigate]);

    return (
        <RecipeList recipes={recipes}/>
    );
}

export default RecipeListPage;