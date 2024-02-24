import RecipeInfoInput from "./RecipeInfoInput";
import StepsInputs from "./StepsInputs";

import { useMemo } from "react";

import { Box, Button, Modal, Typography } from "@mui/material";

import { useRecipeFormData } from "./RecipeFormControl";


function RecipeFormDisplay() {

    const {handleSubmit, formData} = useRecipeFormData();

    const recipeInfo = useMemo(()=>({
        name:formData.name,
        description:formData.description,
        sourceName:formData.sourceName,
        sourceUrl:formData.sourceUrl||undefined,
    }),[
        formData.name,
        formData.description,
        formData.sourceName,
        formData.sourceUrl
    ])

    return (
        <Box className="RecipeForm">
            <form onSubmit={async (values)=>{
              handleSubmit(values)
            }} >
            <RecipeInfoInput recipeInfo={recipeInfo}/>
            <StepsInputs initialSteps={formData.steps}/>
            <Box className="Recipe-submitButton">
                <Button
                type='submit'
                variant="contained"
                color="primary"
                >
                <Typography variant="h5">
                    Save Changes
                </Typography>
                </Button>
            </Box>
            </form>
        </Box>
    );
}

export default RecipeFormDisplay;