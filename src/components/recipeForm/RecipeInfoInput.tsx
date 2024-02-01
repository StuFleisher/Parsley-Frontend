import { ChangeEvent } from "react";

import "./RecipeInfoInput.scss"

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

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
        <Box className="RecipeInfo">
            <TextField
                value={recipe.name}
                placeholder="Name your recipe"
                className="RecipeInfo-name"
                onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                name="name"
            />

            <TextField
                value={recipe.description}
                placeholder='Add a description for your recipe'
                className="RecipeInfo-description"
                onChange = {(e:ChangeEvent<HTMLInputElement>)=> handleChange(e)}
                name="description"
                />

            <Box className="RecipeInfo-sourceName">
                <TextField
                    name="sourceName"
                    placeholder='Where did you find this recipe?'
                    value={recipe.sourceName}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                    />
            </Box>
        </Box>
    );
}

export default RecipeInfoInput;