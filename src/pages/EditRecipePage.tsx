import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { RecipeFormProvider } from "../helpers/RecipeFormContext";
import userContext from "../helpers/userContext";
import RecipeFormDisplay from "../components/recipeForm/RecipeFormDisplay";
import ParsleyAPI from "../helpers/api";
import RecipeBanner from "../components/recipeForm/RecipeBanner";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function EditRecipePage() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [image, setImage] = useState<Blob | undefined>();
    const [saving, setSaving] = useState(false);
    const user = useContext(userContext);
    const navigate = useNavigate();

    if (recipe && (user.username !== recipe?.owner)) { navigate(`/recipes/${id}`); }

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
        setSaving(true);
        try {
            await ParsleyAPI.UpdateRecipe(formData);
            if (recipe) {
                if (image) {
                    await ParsleyAPI.updateRecipeImage(image, recipe.recipeId);
                }
                navigate(`/recipes/${recipe.recipeId}`);
            }
        } catch (err) {
            //TODO: display error message
            setSaving(false);
        }
    }

    /** Callback to delete a recipe and update the record */
    async function deleteRecipe(): Promise<void> {
        console.log("deleteRecipe");
        await ParsleyAPI.DeleteRecipe(recipe!.recipeId);
        navigate(`/recipes/`);
    }

    /** Callback to update the image state for submission along with the recipeForm */
    const updateRecipeImage = useCallback((file: Blob) => {
        setImage(file);
    }, []);

    return (
        <Container className="Page-container" maxWidth="xl">
            {!recipe
                ?
                <LoadingSpinner />
                :
                <>
                    {saving &&
                        <Modal open={true}>
                            <Box className="LoadingSpinnerContainer">
                                <LoadingSpinner />
                            </Box>
                        </Modal>
                    }
                    <RecipeBanner
                        image={image}
                        updateImage={updateRecipeImage}
                        imageUrl={recipe.imageLg}
                        editable
                    />

                    <RecipeFormProvider recipe={recipe} onSubmitCallback={updateRecipe}>
                        <RecipeFormDisplay deleteRecipe={deleteRecipe} />
                    </RecipeFormProvider>
                </>
            }
        </Container >
    )
}

export default EditRecipePage;