import { ChangeEvent } from "react";
import "./InstructionInput.scss";

import TextField from "@mui/material/TextField";

type props = {
    instruction:string,
    stepIndex:number,
    updateInstruction:Function,
}

/** Input to change the instructions for a recipe step
 *
 * @prop instruction:string -> the text description of the instruction
 * @prop stepIndex -> the index of the parent step in the full list of steps
 *
 * StepInput > InstructionInput
 */
function InstructionInput({instruction, stepIndex, updateInstruction}:props){

    function handleChange(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        // console.log("running handleChange from InstructionInput")
        console.log("intended new value:", e.target.value)
        updateInstruction(stepIndex,e.currentTarget.value)
    }

    return (
        <TextField
            multiline
            minRows={5}
            maxRows={20}
            fullWidth
            name="instruction"
            id = {`Step${stepIndex}-instruction`}
            className="InstructionInput"
            value={instruction}
            onChange={e=>{handleChange(e)}}
        />
    )
}

export default InstructionInput