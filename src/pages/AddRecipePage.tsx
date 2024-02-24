import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { RecipeFormControl } from "../components/recipeForm/RecipeFormControl";
import RecipeFormDisplay from "../components/recipeForm/RecipeFormDisplay";
import ParsleyAPI from "../helpers/api";
import GenerateRecipeFromTextForm from "../components/generateRecipe/GenerateRecipeFromTextForm";
import {useContext} from "react";
import userContext from "../helpers/userContext";


type Props = {
    initialRecipe?: RecipeForCreate;
}

const emptyRecipe: RecipeForCreate = {
    name: "",
    description: "",
    owner: "",
    sourceName:"",
    steps: [{
        stepNumber:1,
        instructions:"",
        ingredients:[],
    }
    ],
  };

function AddRecipePage ({initialRecipe=emptyRecipe}:Props){

    const [mode,setMode] = useState<"input"|"generate"|"display">("input")
    const [error,setError] = useState<string|null>(null)
    const {username} = useContext(userContext);
    const [image, setImage] = useState<Blob | undefined>();
    const [recipe, setRecipe] = useState<RecipeForCreate>(initialRecipe);
    const navigate = useNavigate();
    // const owner= useContext;

    useEffect(function rerenderOnRecipeChange() {
        setRecipe(initialRecipe);
    }, [initialRecipe]);

    /** Sends an API request to generate a well formatted recipe object based
     * on data from the GenerateRecipieFromTextForm component.
     *
     * Updates mode state to "generate" while working, then "display" upon success.
     *
     * @param formData: {recipeText:string}
     */
    async function generateRecipe(formData:{recipeText:string}){
        setError(null)
        setMode("generate");
        try {
            const generatedRecipe:GeneratedRecipe = await ParsleyAPI.generateRecipe(formData);

            let recipeForCreate = {
                ...generatedRecipe,
                owner: username!,
                description: "",
                sourceName: "",
                sourceUrl:"",
            }

            setRecipe(recipeForCreate);
            setMode("display");
        } catch(err:any){
            setError(err.message);
            setMode("input");
        }
    }

    /** Sends an API request to store a recipe based on the current form values
     * Navigates to the record view upon success.
     */
    async function saveRecipe(formData:IRecipe){
        //TODO: validate inputs
        const recipe = await ParsleyAPI.createRecipe(formData);
        //update recipeImage
        console.log(image)
        if (image){
            await ParsleyAPI.updateRecipeImage(image,recipe.recipeId)
        }
        navigate(`/recipes/${recipe.recipeId}`)
    }

    /******************* Conditional rendering *****************************/
    let pageContent;

    if (mode === "generate"){
        pageContent = <p>Generating your recipe. This may take a moment.</p>;
    }

    if (mode === "display"){
        pageContent = (
            <RecipeFormControl recipe={recipe} onSubmitCallback={saveRecipe}>
                <RecipeFormDisplay/>
            </RecipeFormControl>
        )
    }

    if ( mode === "input"){
        pageContent=<GenerateRecipeFromTextForm onSubmit={generateRecipe}/>
    }


    return (
        <>
        {error ? "Sorry! Our chefs weren't able to prepare that recipe for you." : ""}
        {pageContent}
        </>
    )


}

export default AddRecipePage