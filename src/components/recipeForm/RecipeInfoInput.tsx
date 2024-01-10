import { ChangeEvent } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import AutoResizeInput from "../ui/AutoResizeInput";
import "./RecipeInfoInput.scss"

type props = {
    recipe: IRecipe;
    updateRecipeInfo: Function;
}

function RecipeInfoInput({ recipe, updateRecipeInfo }: props) {

    function handleChange(e:ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLInputElement>){
        const newRecipeInfo = {
            ...recipe,
            [e.target.name]:e.target.value,
        }
        updateRecipeInfo(newRecipeInfo)
    }

    return (
        <div className="RecipeInfo">
            <TextareaAutosize
                value={recipe.name}
                placeholder="Name your recipe"
                className="RecipeInfo-name"
                onChange={(e)=>handleChange(e)}
                name="name"
            />

            <TextareaAutosize
                value={recipe.description}
                placeholder='Add a description for your recipe'
                className="RecipeInfo-description"
                onChange = {(e)=> handleChange(e)}
                name="description"
                />

            <div className="RecipeInfo-sourceName">
                {/* <label htmlFor="sourceName">Source</label> */}
                <AutoResizeInput
                    name="sourceName"
                    placeholder='Where did you find this recipe?'
                    value={recipe.sourceName}
                    updateValue={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                    />
            </div>
        </div>
    );
}

export default RecipeInfoInput;