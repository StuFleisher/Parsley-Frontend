
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import userContext from "../helpers/userContext";
import ParsleyAPI from "../helpers/api";
import RecipeList from "../components/recipeDisplay/RecipeList";

import { useSearchParams } from "react-router-dom";

function RecipeListPage() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")
    const [recipes, setRecipes] = useState<SimpleRecipeData[]>([]);

    const navigate = useNavigate();
    useEffect(function getRecipesOnMount() {

        async function fetchRecipes() {
            try {
                const recipesData = await ParsleyAPI.getAllRecipes(query);
                setRecipes(recipesData);
            } catch (err) {
                console.log(err);
                navigate('/');
            }
        }

        fetchRecipes();
    }, [navigate,query]);

    return (
        <RecipeList recipes={recipes} />
    );
}

export default RecipeListPage;