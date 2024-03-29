import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

import IngredientInputList from "./IngredientInputList";
import InstructionInput from "./InstructionInput";
import "./StepInput.scss";
import parsleyTheme from "../../styles/theme";

type props = {
    index:number,
    step:IStep|StepForCreate
}

/** Renders components for updating a step
 *
 * @prop step:IStep -> the data for the step itself
 * @prop index:number -> the steps index in the master list of steps
 *
 * StepsInputs > StepInput > {IngredientInputList, InstructionInput}
 */

const StepInput = React.memo(function StepInput({
    index,
    step,
}:props){

    return (
        <>
            <Box className="Step-number">
                <Typography component="h3" variant="h2">
                    Step {step.stepNumber}
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
                    ingredients={step.ingredients}
                />
                </Box>
                <Box className="Step-instructions">
                    <InstructionInput
                        stepIndex={index}
                        />
                </Box>
            </Stack>
        </>
    )
})

export default StepInput