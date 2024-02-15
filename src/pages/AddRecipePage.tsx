import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import RecipeForm from "../components/recipeForm/RecipeForm"
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
    const {username} = useContext(userContext);

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
            console.error(err.message)
        }
        //TODO: handle generation errors
    }

    /** Sends an API request to store a recipe based on the current form values
     * Navigates to the record view upon success.
     */
    async function saveRecipe(formData:IRecipe, image?:Blob){
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