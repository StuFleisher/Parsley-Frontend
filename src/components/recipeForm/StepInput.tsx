import React from "react";

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
    step:IStep,
    index:number,
}

/** Renders components for updating a step
 *
 * @prop step:IStep -> the data for the step itself
 * @prop index:number -> the steps index in the master list of steps
 *
 * StepsInputs > StepInput > {IngredientInputList, InstructionInput}
 */

const StepInput = React.memo(function StepInput({step,index}:props){

    const {stepNumber, instructions, ingredients} = step;

    return (
        <>
            <Box className="Step-number">
                <Typography component="h3" variant="h2">
                    Step {stepNumber}
                </Typography>
            </Box>
            <Stack
                direction = "column" //{{xs:"column", md:"row"}}
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
                    ingredients={ingredients}
                    stepIndex={index}
                    />
                </Box>
                <Box className="Step-instructions">
                    <InstructionInput
                        instruction={instructions}
                        stepIndex={index}
                        />
                </Box>
            </Stack>
        </>
    )
})

export default StepInput