import React, { useState,ChangeEvent, FocusEvent } from "react";
import {useFormikContext} from "formik"


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



const RecipeInfoInput = React.memo(
function RecipeInfoInput() {

    const {values, handleChange, handleBlur, errors, touched} = useFormikContext<IRecipe|RecipeForCreate>();

    return (
        <Box className="RecipeInfoInput">

                <TextField
                    value={values.name}
                    placeholder="Name your recipe"
                    className="RecipeInfo-name MuiTypography-h2"
                    onChange={handleChange}
                    name="name"
                    id="recipe-name"
                    label="recipe name"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={3}
                    required
                    />

                <TextField
                    value={values.description}
                    placeholder='Add a description for your recipe'
                    className="RecipeInfo-description"
                    onChange = {handleChange}
                    name="description"
                    id="recipe-Description"
                    label="recipe description"
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={10}
                    required
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
                        value={values.sourceName}
                        onChange={handleChange}
                        label="source"
                        fullWidth
                        required

                    />
                    <TextField
                        name="sourceUrl"
                        id="Recipe-sourceUrl"
                        placeholder='Where did you find this recipe?'
                        value={values.sourceUrl}
                        onChange={handleChange}
                        label="URL"
                        fullWidth
                    />
                </Stack>
        </Box>
    );
})

export default RecipeInfoInput;