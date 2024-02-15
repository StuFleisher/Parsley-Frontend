import React, { useState,ChangeEvent } from "react";

import "./RecipeInfoInput.scss"
import ImageForm from "../ui/ImageForm"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

type props = {
    recipe: IRecipe | RecipeForCreate;
    updateRecipeInfo: Function;
    updateRecipeImage: Function;
}

const RecipeInfoInput = React.memo(
function RecipeInfoInput({
    recipe,
    updateRecipeInfo,
    updateRecipeImage,
}: props) {

    // const [showModal, setShowModal] = useState(false);

    function handleChange(e:ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLInputElement>){
        const newRecipeInfo = {
            ...recipe,
            [e.target.name]:e.target.value,
        }
        updateRecipeInfo(newRecipeInfo)
    }

    return (
        <Box className="RecipeInfoInput">

                <TextField
                    value={recipe.name}
                    placeholder="Name your recipe"
                    className="RecipeInfo-name MuiTypography-h2"
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                    name="name"
                    id="recipe-name"
                    label="recipe name"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={3}

                    />

                <TextField
                    value={recipe.description}
                    placeholder='Add a description for your recipe'
                    className="RecipeInfo-description"
                    onChange = {(e:ChangeEvent<HTMLInputElement>)=> handleChange(e)}
                    name="description"
                    id="recipe-Description"
                    label="recipe description"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={10}

                    />

                <Stack
                    className="RecipeInfo-sourceName"
                    direction="row"
                    spacing={1}
                >
                    <TextField
                        name="sourceName"
                        id="Recipe-sourceName"
                        placeholder='Where did you find this recipe?'
                        value={recipe.sourceName}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                        label="source"
                        fullWidth
                    />
                    <TextField
                        name="sourceUrl"
                        id="Recipe-sourceUrl"
                        placeholder='Where did you find this recipe?'
                        value={recipe.sourceUrl}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                        label="URL"
                        fullWidth
                    />
                </Stack>
        </Box>
    );
})

export default RecipeInfoInput;