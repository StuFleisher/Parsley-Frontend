import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import RecipeForm from "../components/recipeForm/RecipeForm"
import ParsleyAPI from "../helpers/api";

import Box from "@mui/material/Box";


function EditRecipePage () {

    const { id } = useParams();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
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

    async function updateRecipe(formData:IRecipe){
        //TODO: validate inputs
        if (recipe){
            await ParsleyAPI.UpdateRecipe(formData)
            navigate(`/recipes/${recipe.recipeId}`);
        }
    }

    return (
        !recipe
        ?
            <p> Loading...</p>
        :
        <>
            <Box component="img" src={recipe.imageUrl} className="RecipeBanner"/>
            <RecipeForm recipe={recipe} onSubmitCallback={updateRecipe} />
        </>
    )
}

export default EditRecipePage