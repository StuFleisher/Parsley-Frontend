import IngredientList from "./IngredientList";
import Instruction from "./Instruction";
import './Step.scss';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import parsleyTheme from "../../styles/theme";
import useMediaQuery from "@mui/material/useMediaQuery";


type IngredientColorRelationship = {
    listRef: String;
    instructionRef: String;
    color: String;
}

function Step({step}:{step:IStep}){

    const {stepNumber, instructions, ingredients} = step;

    function createColorMap(step:IStep){
        let instructionRefs=new Set();
        for (let ingredient of step.ingredients){
            instructionRefs.add(ingredient.instructionRef);
        }

        let colorMap:IngredientColorRelationship[] = [];
        for (let ingredient of step.ingredients){
            colorMap.push({
                listRef:ingredient.description,
                instructionRef:ingredient.instructionRef,
                color:"mint",
            })
        }
        return colorMap;
    }

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
                    <IngredientList ingredients={ingredients}/>
                </Box>
                <Box className="Step-instructions">
                    <Instruction instruction={instructions}/>
                </Box>
            </Stack>
        </>
    )
}

export default Step