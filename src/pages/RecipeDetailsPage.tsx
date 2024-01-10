import ParsleyAPI from "../helpers/api";
import RecipeCard from "../components/recipeDisplay/RecipeCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import testRecipe from "../tempData";



function RecipeDetailsPage() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState<IRecipe>(testRecipe);
    const navigate = useNavigate();

    useEffect(function fetchRecipeOnMount() {
        async function fetchRecipe() {
            try {
                if (id !== undefined) {
                    const numericId = parseInt(id);
                    const recipeDetails = await ParsleyAPI.getRecipeById(numericId);
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

        isLoading
        ?
            <p>Loading...</p>
        :
            <>
                <RecipeCard recipe={recipe} />
                <a href={`/recipes/${recipe.recipeId}/edit`}> Edit this Recipe</a>
            </>

    );

}

export default RecipeDetailsPage;