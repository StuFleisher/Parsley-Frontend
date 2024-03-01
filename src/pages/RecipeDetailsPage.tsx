import ParsleyAPI from "../helpers/api";
import RecipeCard from "../components/recipeDisplay/RecipeCard";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import userContext from "../helpers/userContext";

import { CookbookProvider } from "../helpers/cookbookContext";

import Box from "@mui/material/Box";
// import testRecipe from "../tempData";



function RecipeDetailsPage() {

    const { id } = useParams();
    const {username} = useContext(userContext);

    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState<Recipe | null >(null);
    const navigate = useNavigate();

    useEffect(function fetchRecipeOnMount() {
        async function fetchRecipe() {
            try {
                console.log('running fetchRecipe')
                if (id !== undefined) {
                    const numericId = parseInt(id);
                    const recipeDetails = await ParsleyAPI.getRecipeById(numericId);
                    console.log("current", recipe)
                    console.log("fetched", recipeDetails);
                    setRecipe(recipeDetails);
                    setIsLoading(false);
                }
            } catch (err) {
                navigate('/recipes');
            }
        }
        fetchRecipe();

    }, [id, navigate]);



    return (

        <CookbookProvider username={username!}>

        {!recipe
        ?
            <p>Loading...</p>
        :
            <>
                <RecipeCard recipe={recipe} />
                {username!==recipe.owner ? "" :<Link to={`/recipes/${recipe.recipeId}/edit`}> Edit this Recipe</Link>}
            </>}

        </CookbookProvider>
    );

}

export default RecipeDetailsPage;