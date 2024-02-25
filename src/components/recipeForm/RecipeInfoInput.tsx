import React from "react";
import {FastField} from "formik"


import "./RecipeInfoInput.scss"

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormikMuiTextField from "../ui/FormikMuiTextField";



const RecipeInfoInput = React.memo(
function RecipeInfoInput() {

    return (
        <Box className="RecipeInfoInput">

                <FastField
                    component={FormikMuiTextField}
                    placeholder="Name your recipe"
                    className="RecipeInfo-name MuiTypography-h2"
                    name="name"
                    id="recipe-name"
                    label="recipe name"
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={3}
                    />

                <FastField
                    component={FormikMuiTextField}
                    placeholder='Add a description for your recipe'
                    className="RecipeInfo-description"
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
                    <FastField
                        component={FormikMuiTextField}
                        name="sourceName"
                        id="Recipe-sourceName"
                        placeholder='Where did you find this recipe?'
                        label="source"
                        fullWidth
                    />
                    <FastField
                        component={FormikMuiTextField}
                        name="sourceUrl"
                        id="Recipe-sourceUrl"
                        placeholder='Where did you find this recipe?'
                        label="URL"
                        fullWidth
                    />
                </Stack>
        </Box>
    );
})

export default RecipeInfoInput;