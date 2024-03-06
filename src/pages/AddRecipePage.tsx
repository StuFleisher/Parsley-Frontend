import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ParsleyAPI from "../helpers/api";
import GenerateRecipeFromTextForm from "../components/generateRecipe/GenerateRecipeFromTextForm";
import { useContext } from "react";
import userContext from "../helpers/userContext";
import { RecipeFormProvider } from "../helpers/RecipeFormContext";
import RecipeFormDisplay from "../components/recipeForm/RecipeFormDisplay";
import RecipeBanner from "../components/recipeForm/RecipeBanner";
import Container from "@mui/material/Container";

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

function AddRecipePage({ initialRecipe = emptyRecipe }: Props) {

    const [mode, setMode] = useState<"input" | "generate" | "display">("input");
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
    async function generateRecipe(formData: { recipeText: string; }) {
        setError(null);
        setMode("generate");
        try {
            const generatedRecipe: GeneratedRecipe = await ParsleyAPI.generateRecipe(formData);

            let recipeForCreate = {
                ...generatedRecipe,
                owner: username!,
                description: "",
                sourceName: "",
                sourceUrl: "",
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

    if (mode === "generate") {
        pageContent = <p>Generating your recipe. This may take a moment.</p>;
    }

    if (mode === "display") {
        pageContent = (
            <>
                <RecipeBanner
                    image={image}
                    updateImage={updateRecipeImage}
                    imageUrl={recipe.imageUrl}
                    editable
                />
                <RecipeFormProvider<RecipeForCreate> recipe={recipe} onSubmitCallback={saveRecipe}>
                    <RecipeFormDisplay />
                </RecipeFormProvider>
            </>
        );
    }

    if (mode === "input") {
        pageContent = <GenerateRecipeFromTextForm onSubmit={generateRecipe} />;
    }


    return (
        <Container>
            {error ? "Sorry! Our chefs weren't able to prepare that recipe for you." : ""}
            {pageContent}
        </Container>
    );


}

export default AddRecipePage;