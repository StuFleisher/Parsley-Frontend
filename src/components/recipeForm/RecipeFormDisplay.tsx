import {useState} from "react";

import RecipeInfoInput from "./RecipeInfoInput";
import StepsInputs from "./StepsInputs";
import RecipeImageForm from "./RecipeImageForm";

import { Box, Button, Modal, Typography } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import {useFormikContext} from "formik";

type Props = {
    recipe: RecipeForCreate | IRecipe,
    onSubmitCallback: Function,
  };

function RecipeFormDisplay() {

    const {values, handleSubmit} = useFormikContext();

    return (
        <>

        <Box className="RecipeForm">

            <form onSubmit={async (values)=>{
              handleSubmit(values)
            }} >
            <RecipeInfoInput/>
            <StepsInputs steps={(values as IRecipe).steps}/>
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
        </>
    );
}

export default RecipeFormDisplay;