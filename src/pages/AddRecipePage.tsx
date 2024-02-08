import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import RecipeForm from "../components/recipeForm/RecipeForm"
import ParsleyAPI from "../helpers/api";
import GenerateRecipeFromTextForm from "../components/generateRecipe/GenerateRecipeFromTextForm";

type Props = {
    initialRecipe?: IRecipe;
}

const emptyRecipe: IRecipe = {
    name: "",
    description: "",
    sourceName:"",
    steps: [{
        stepNumber:1,
        instructions:"",
        ingredients:[],
    }
    ], // Initialize steps as an empty array
  };

function AddRecipePage ({initialRecipe=emptyRecipe}:Props){

    const [mode,setMode] = useState<"input"|"generate"|"display">("input") 

    const [recipe, setRecipe] = useState<IRecipe>(initialRecipe);
    const navigate = useNavigate();

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
        setMode("generate");
        const generatedRecipe = await ParsleyAPI.generateRecipe(formData);
        //TODO: handle generation errors
        setRecipe(generatedRecipe);
        setMode("display");
    }

    /** Sends an API request to store a recipe based on the current form values
     * Navigates to the record view upon success.
     */
    async function saveRecipe(formData:IRecipe){
        //TODO: validate inputs
        const recipe = await ParsleyAPI.createRecipe(formData);
        navigate(`/recipes/${recipe.recipeId}`)
    }

    /******************* Conditional rendering *****************************/

    if (mode === "generate"){
        return <p>Generating your recipe. This may take a moment.</p>
    }

    if (mode === "display"){
        return (
            <RecipeForm recipe={recipe} onSubmitCallback={saveRecipe}/>
        )
    }

    return ( //mode === "input"
        <GenerateRecipeFromTextForm onSubmit={generateRecipe}/>
    )

}

export default AddRecipePage