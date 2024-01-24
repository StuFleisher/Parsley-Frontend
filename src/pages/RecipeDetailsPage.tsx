import ParsleyAPI from "../helpers/api";
import RecipeCard from "../components/recipeDisplay/RecipeCard";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import testRecipe from "../tempData";



function RecipeDetailsPage() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState<IRecipe | null >(null);
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

        !recipe
        ?
            <p>Loading...</p>
        :
            <>
                <RecipeCard recipe={recipe} />
                <Link to={`/recipes/${recipe.recipeId}/edit`}> Edit this Recipe</Link>
            </>

    );

}

export default RecipeDetailsPage;