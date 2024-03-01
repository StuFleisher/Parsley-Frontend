import React from "react";
import "./InstructionInput.scss";
import {FastField} from "formik"

import FormikMuiTextField from "../ui/FormikMuiTextField";

type props = {
    stepIndex:number,
}

/** Input to change the instructions for a recipe step
 *
 * @prop instruction:string -> the text description of the instruction
 * @prop stepIndex -> the index of the parent step in the full list of steps
 *
 * StepInput > InstructionInput
 */
const InstructionInput = React.memo(({stepIndex}:props)=>{

    return (
        <FastField
            component={FormikMuiTextField}
            multiline
            rows={5}
            fullWidth
            name={`steps[${stepIndex}].instructions`}
            id = {`Step${stepIndex}-instruction`}
            className="InstructionInput"
        />
    )
})

export default InstructionInput