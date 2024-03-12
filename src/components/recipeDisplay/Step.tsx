import React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import IngredientList from "./IngredientList";
import Instruction from "./Instruction";
import './Step.scss';
import parsleyTheme from "../../styles/theme";

import {getIngredientColorMaps} from "../../helpers/colorPicker";


const Step = React.memo(function Step({step}:{step:IStep}){

    const {stepNumber, instructions, ingredients} = step;

    const {instructionsColors, ingredientsColors} = getIngredientColorMaps(step.ingredients);

    return (
        <>
            <Box className="Step-number">
                <Typography component="h3" variant="h2">
                    Step {stepNumber}
                </Typography>
            </Box>
            <Stack
                direction = {{xs:"column", md:"row"}}
                spacing={2}
                divider={
                   <Divider
                        orientation={useMediaQuery(parsleyTheme.breakpoints.down("md")) ? "horizontal" : "vertical"}
                        flexItem
                    />
                }
            >
                <Box className="Step-ingredients">
                    <IngredientList ingredients={ingredients} colorMap={ingredientsColors}/>
                </Box>
                <Box className="Step-instructions">
                    <Instruction instruction={instructions} colorMap={instructionsColors}/>
                </Box>
            </Stack>
        </>
    )
})

export default Step