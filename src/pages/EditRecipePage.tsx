import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { RecipeFormProvider } from "../helpers/RecipeFormContext";
import RecipeFormDisplay from "../components/recipeForm/RecipeFormDisplay";
import RecipeImageForm from "../components/recipeForm/RecipeImageForm";
import ParsleyAPI from "../helpers/api";

import { Button, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";


function EditRecipePage() {

    const { id } = useParams();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [image, setImage] = useState<Blob | undefined>();

    const [showModal, setShowModal] = useState(false);
    function closeModal() {
        setShowModal(false);
    }

    const [isLoading, setIsLoading] = useState(true);
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

    async function updateRecipe(formData: IRecipe) {
        console.log("submitting form");
        await ParsleyAPI.UpdateRecipe(formData);
        if (recipe) {
            if (image) {
                await ParsleyAPI.updateRecipeImage(image, recipe.recipeId);
            }
            navigate(`/recipes/${recipe.recipeId}`);
        }
    }

    const updateRecipeImage = useCallback((file: Blob) => {
        closeModal();
        setImage(file);
    }, []);

    return (
        !recipe
            ?
            <p> Loading...</p>
            :
            <>
                <Modal
                    open={showModal}
                    onClose={closeModal}
                >
                    <Box className="EditImageModal">
                        <RecipeImageForm updateRecipeImage={updateRecipeImage} />
                    </Box>
                </Modal>

                <Box component="img"
                    src={image ? URL.createObjectURL(image) : recipe.imageUrl}
                    className="RecipeBanner"
                />

                <Button
                    className="RecipeInfo-editImage"
                    onClick={() => { setShowModal(true); }}
                    startIcon={<FontAwesomeIcon icon={faPencilAlt} />}
                    variant="contained"
                    color="brightWhite"
                >
                    Image
                </Button>

                {/* <Box component="img" src={recipe.imageUrl} className="RecipeBanner" /> */}
                <RecipeFormProvider recipe={recipe} onSubmitCallback={updateRecipe}>
                    {/* <RecipeForm recipe={recipe} onSubmitCallback={updateRecipe} /> */}
                    <RecipeFormDisplay />

                </RecipeFormProvider>
            </>
    );
}

export default EditRecipePage;