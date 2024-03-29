
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

import Lottie from "lottie-react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";

import { RecipeFormProvider } from "../helpers/RecipeFormContext";
import userContext from "../helpers/userContext";
import ParsleyAPI from "../helpers/api";
import RecipeFormDisplay from "../components/recipeForm/RecipeFormDisplay";
import RecipeBanner from "../components/recipeForm/RecipeBanner";
import SimpleLayout from "../components/ui/SimpleLayout";
import loadingAnimation from "../animations/loading_animation.json";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import "./AddRecipePage.scss";
import GenerateRecipeDisplay from "../components/generateRecipe/GenerateRecipeDisplay";

type Props = {
    initialRecipe?: RecipeForCreate;
};

const emptyRecipe: RecipeForCreate = {
    name: "",
    description: "",
    owner: "",
    sourceName: "",
    steps: [{
        stepNumber: 1,
        instructions: "",
        ingredients: [],
    }
    ],
};

const DEFAULT_IMG_BASE_URL = "https://sf-parsley.s3.amazonaws.com/recipeImage/default";

function AddRecipePage({ initialRecipe = emptyRecipe }: Props) {

    const [mode, setMode] = useState<"input" | "generate" | "display" | "saving">("input");
    const [error, setError] = useState<string | null>(null);
    const [image, setImage] = useState<Blob | undefined>();
    const [recipe, setRecipe] = useState<RecipeForCreate>(initialRecipe);

    const { username } = useContext(userContext);
    const navigate = useNavigate();

    /** Sends an API request to generate a well formatted recipe object based
     * on data from the GenerateRecipieFromTextForm component.
     *
     * Updates mode state to "generate" while working, then "display" upon success.
     *
     * @param formData: {recipeText:string}
     */
    async function generateRecipe( data:{ recipeText: string; }|Blob) {
        setError(null);
        setMode("generate");
        try {
            let generatedRecipe: GeneratedRecipe
            if ("recipeText" in data){
                generatedRecipe = await ParsleyAPI.generateRecipeFromText(data);
            } else {
                generatedRecipe = await ParsleyAPI.generateRecipeFromImage(data);
            }

            let recipeForCreate = {
                ...generatedRecipe,
                owner: username!,
                sourceUrl: "",
                imageLg: `${DEFAULT_IMG_BASE_URL}-lg`,
                imageMd: `${DEFAULT_IMG_BASE_URL}-md`,
                imageSm: `${DEFAULT_IMG_BASE_URL}-sm`,
            };

            setRecipe(recipeForCreate);
            setMode("display");
        } catch (err: any) {
            setError(err.message);
            setMode("input");
        }
    }

    /** Sends an API request to store a recipe based on the current form values
     * Navigates to the recipeDetail view upon success.
     */
    async function saveRecipe(formData: RecipeForCreate) {
        setMode("saving");
        const recipe = await ParsleyAPI.createRecipe(formData);
        if (image) {
            await ParsleyAPI.updateRecipeImage(image, recipe.recipeId);
        }
        navigate(`/recipes/${recipe.recipeId}`);
    }

    /** Callback to update the image state for submission along with the recipeForm */
    const updateRecipeImage = useCallback((file: Blob) => {
        setImage(file);
    }, []);

    /******************* Conditional rendering *****************************/
    let pageContent;


    if (mode === "input") {
        pageContent = (
            // <SimpleLayout src="/images/banner01.jpg">
                <GenerateRecipeDisplay generateRecipe={generateRecipe} />
            // </SimpleLayout>
        );
    }

    if (mode === "generate") {
        pageContent = (
            <SimpleLayout src="/images/banner01.jpg">
                <Box className="LoadingAnimation">
                    <Typography variant="h1" color="primary" align="center"> Let him cook! </Typography>
                    <Lottie loop animationData={loadingAnimation} />
                    <Typography variant="body1" color="charcoal" align="center">Our AI chef is preparing your recipe. This may take a minute or two.</Typography>
                </Box>
            </SimpleLayout>);
    }

    if (mode === "display") {
        pageContent = (
            <Container className="Page-container" maxWidth="xl">
                <RecipeBanner
                    image={image}
                    updateImage={updateRecipeImage}
                    imageUrl={recipe.imageLg}
                    editable
                />
                <RecipeFormProvider<RecipeForCreate> recipe={recipe} onSubmitCallback={saveRecipe}>
                    <RecipeFormDisplay deleteRecipe={async () => { navigate('/recipes'); }} />
                </RecipeFormProvider>
            </Container>
        );
    }

    if (mode === "saving") {
        pageContent = (
            <>
                <Modal open={true}>
                    <LoadingSpinner />
                </Modal>
                <RecipeBanner
                    image={image}
                    updateImage={updateRecipeImage}
                    imageUrl={recipe.imageLg}
                    editable
                />
                <RecipeFormProvider<RecipeForCreate> recipe={recipe} onSubmitCallback={saveRecipe}>
                    <RecipeFormDisplay deleteRecipe={async () => { navigate('/recipes'); }} />
                </RecipeFormProvider>
            </>
        );
    }


    return (
        <>
            {error ? "Sorry! Our chefs weren't able to prepare that recipe for you." : ""}
            {pageContent}
        </>
    );


}

export default AddRecipePage;;