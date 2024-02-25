import StepInput from "./StepInput";
import React, { MouseEvent } from "react";
import './StepsInputs.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRecipeFormCallbacks } from "./RecipeFormControl";

type props = {
    initialSteps:StepFormData[];
}

/** Renders StepInput components for every Step passed to props
 *
 * @prop initialSteps: IStep[] ->
 */

const StepsInputs =  React.memo(
function StepsInputs ({initialSteps}:props){

    const {
        createStep,
        deleteStep,
    } = useRecipeFormCallbacks();

    function handleCreate(e:MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        const target = e.currentTarget;
        createStep(Number(target.getAttribute('data-index'))+1);
    }

    function handleDelete(e: MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        const target = e.currentTarget;
        console.log(target)
        deleteStep(Number(target.getAttribute('data-index')));
    }

    return (
        <Box className="StepList">
            {initialSteps.map((step,i)=>{
                return (
                    <React.Fragment key={`Step-${i}`}>
                        <Box  className="StepInput">
                            <StepInput
                                step={step}
                                index={step.stepNumber.value-1}
                            />
                            <Box
                                className="StepInput-delete"
                                component="button"
                                data-index={i}
                                onClick={handleDelete}
                            >
                                <FontAwesomeIcon icon={faCircleXmark}/>
                            </Box>
                        </Box>
                        <Stack direction="row">
                            <Button
                                className="Step-create"
                                onClick={handleCreate}
                                data-index={i}
                                variant = "outlined"
                                startIcon = {<FontAwesomeIcon icon={faPlusCircle}/>}
                            >
                                New Step
                            </Button>
                        </Stack>
                    </React.Fragment>
            )
            })}
        </Box>
    )
})

export default StepsInputs

