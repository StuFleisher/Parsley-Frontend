import React from "react";
import {useFormikContext} from "formik"

import IngredientInputList from "./IngredientInputList";
import InstructionInput from "./InstructionInput";
import "./StepInput.scss";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import parsleyTheme from "../../styles/theme";
import useMediaQuery from "@mui/material/useMediaQuery";

type props = {
    // step:IStep,
    index:number,
    // updateInstruction:Function,
    // updateIngredients:Function,
    // deleteIngredient:Function,
    // createIngredient:Function,
}

/** Renders components for updating a step
 *
 * @prop step:IStep -> the data for the step itself
 * @prop index:number -> the steps index in the master list of steps
 *
 * StepsInputs > StepInput > {IngredientInputList, InstructionInput}
 */

const StepInput = React.memo(function StepInput({
    // step,
    index,
    // updateInstruction,
    // updateIngredients,
    // deleteIngredient,
    // createIngredient
}:props){

    const {values, handleChange, handleBlur, errors, touched} = useFormikContext<IRecipe|RecipeForCreate>();
    const step = values.steps[index];
    const {stepNumber, instructions, ingredients} = step;

    return (
        <>
            <Box className="Step-number">
                <Typography component="h3" variant="h2">
                    Step {stepNumber}
                </Typography>
            </Box>
            <Stack
                direction = "column"
                spacing={2}
                divider={
                   <Divider
                        orientation={useMediaQuery(parsleyTheme.breakpoints.down("md")) ? "horizontal" : "vertical"}
                        flexItem
                    />
                }
            >
                <Box className="Step-ingredientsForm">

                <IngredientInputList
                    stepIndex={index}
                />
                </Box>
                <Box className="Step-instructions">
                    <InstructionInput
                        // instruction={instructions}
                        stepIndex={index}
                        // updateInstruction={stepIndex={index}}
                        />
                </Box>
            </Stack>
        </>
    )
})

export default StepInput