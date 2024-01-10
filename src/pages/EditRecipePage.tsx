import { useState, useEffect, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom"
import RecipeForm from "../components/recipeForm/RecipeForm"
import testRecipe from "../tempData";
import ParsleyAPI from "../helpers/api";


function EditRecipePage () {

    const { id } = useParams();
    const [recipe, setRecipe] = useState<IRecipe>(testRecipe);
    const [isLoading, setIsLoading] = useState(true)
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

    function updateRecipe(formData:IRecipe){
        //TODO: write backend for updates
        //TODO: validate inputs
        console.log('updating recipe')
        navigate(`/recipes/${recipe.recipeId}`);
    }

    return (
        isLoading
        ?
            <p> Loading...</p>
        :
            <RecipeForm recipe={recipe} onSubmitCallback={updateRecipe} />
    )
}

export default EditRecipePage