import React, { useState,ChangeEvent, FocusEvent } from "react";

import "./RecipeInfoInput.scss"
import ImageForm from "../ui/ImageForm"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { isURL } from "../../helpers/utilities";
import { useRecipeFormCallbacks } from "./RecipeFormControl";

type RecipeInfo={
    name:string;
    description:string;
    sourceName:string;
    sourceUrl?:string;
}

type props = {
    recipeInfo: RecipeInfo;
}

const RecipeInfoInput = React.memo(
function RecipeInfoInput({
    recipeInfo,
}: props) {

    const {updateRecipeInfo} = useRecipeFormCallbacks();

    const [blurred,setBlurred] = useState({
        name:false,
        description:false,
        sourceName:false,
        sourceUrl:false,
    })

    const validate = {
        name:()=>{return (recipeInfo.name==="") ? false : true;},
        description:()=>{return (recipeInfo.description==="") ? false : true;},
        sourceName: ()=>{return (recipeInfo.sourceName==="") ? false : true;},
        sourceUrl: ()=>{return ((recipeInfo.sourceUrl==="") || isURL(recipeInfo.sourceUrl))? true : false;},
    }

    function handleChange(e:ChangeEvent<HTMLTextAreaElement>|ChangeEvent<HTMLInputElement>){
        const newRecipeInfo = {
            ...recipeInfo,
            [e.target.name]:e.target.value,
        }
        updateRecipeInfo(newRecipeInfo)
    }

    function blurField(e:FocusEvent<HTMLInputElement>){
        const field = e.target.name;
        setBlurred(()=>{return {...blurred, [field]:true}})
    }


    return (
        <Box className="RecipeInfoInput">

                <TextField
                    value={recipeInfo.name}
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
                    required
                    error={!validate.name()}
                    helperText={validate.name() ? "" : "Name is required"}
                    onBlur = {(e:FocusEvent<HTMLInputElement>)=>{blurField(e)}}
                    />

                <TextField
                    value={recipeInfo.description}
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
                    required
                    error={!validate.description()}
                    helperText={validate.description() ? "" : "Description is required"}
                    onBlur = {(e:FocusEvent<HTMLInputElement>)=>{blurField(e)}}
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
                        value={recipeInfo.sourceName}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                        label="source"
                        fullWidth
                        required
                        error={validate.sourceName()}
                        helperText={validate.sourceName() ? "" : "Source is required"}
                        onBlur = {(e:FocusEvent<HTMLInputElement>)=>{blurField(e)}}

                    />
                    <TextField
                        name="sourceUrl"
                        id="Recipe-sourceUrl"
                        placeholder='Where did you find this recipe?'
                        value={recipeInfo.sourceUrl}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>handleChange(e)}
                        label="URL"
                        fullWidth
                        error={validate.sourceUrl()}
                        helperText={validate.sourceUrl() ? "" : "Invalid URL format"}
                        onBlur = {(e:FocusEvent<HTMLInputElement>)=>{blurField(e)}}
                    />
                </Stack>
        </Box>
    );
})

export default RecipeInfoInput;