import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { RecipeFormProvider } from "../helpers/RecipeFormContext";
import RecipeFormDisplay from "../components/recipeForm/RecipeFormDisplay";
import ParsleyAPI from "../helpers/api";
import { Container } from "@mui/material";
import RecipeBanner from "../components/recipeForm/RecipeBanner";

function EditRecipePage() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [image, setImage] = useState<Blob | undefined>();

    const navigate = useNavigate();

    /** Fetches the full recipe record on mount */
    useEffect(function fetchRecipeOnMount() {
        async function fetchRecipe() {
            try {
                if (id !== undefined) {
                    const numericId = parseInt(id);
                    const recipeDetails = await ParsleyAPI.getRecipeById(numericId);
                    setRecipe(recipeDetails);
                }
            } catch (err) {
                navigate('/recipes');
            }
        }
        fetchRecipe();

    }, [id, navigate]);

    /** Callback to update the recipe record (including it's image) in the database */
    async function updateRecipe(formData: Recipe) {
        console.log("submitting form");
        await ParsleyAPI.UpdateRecipe(formData);
        if (recipe) {
            if (image) {
                await ParsleyAPI.updateRecipeImage(image, recipe.recipeId);
            }
            navigate(`/recipes/${recipe.recipeId}`);
        }
    }

    /** Callback to update the image state for submission along with the recipeForm */
    const updateRecipeImage = useCallback((file: Blob) => {
        setImage(file);
    }, []);

    return (
        <Container className="Page-container" maxWidth="xl">
            {!recipe
                ?
                <p> Loading...</p>
                :
                <>
                    <RecipeBanner
                        image={image}
                        updateImage={updateRecipeImage}
                        imageUrl={recipe.imageUrl}
                        editable
                    />

                    <RecipeFormProvider recipe={recipe} onSubmitCallback={updateRecipe}>
                        <RecipeFormDisplay />
                    </RecipeFormProvider>
                </>}
        </Container>
    );
}

export default EditRecipePage;