import React from "react";
import { ChangeEvent } from "react";
import "./InstructionInput.scss";
import {useFormikContext} from "formik"

import TextField from "@mui/material/TextField";

type props = {
    // instruction:string,
    stepIndex:number,
    // updateInstruction:Function,
}

/** Input to change the instructions for a recipe step
 *
 * @prop instruction:string -> the text description of the instruction
 * @prop stepIndex -> the index of the parent step in the full list of steps
 *
 * StepInput > InstructionInput
 */
const InstructionInput = React.memo(({stepIndex}:props)=>{

    const {values, handleChange, handleBlur, errors, touched} = useFormikContext<IRecipe|RecipeForCreate>();
    const instruction = values.steps[stepIndex].instructions

    return (
        <TextField
            multiline
            rows={5}
            fullWidth
            name={`steps[${stepIndex}].instructions`}
            id = {`Step${stepIndex}-instruction`}
            className="InstructionInput"
            value={instruction}
            onChange={handleChange}
        />
    )
})

export default InstructionInput