import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import { useFormikContext, FieldArray, FieldArrayRenderProps, useField } from "formik";

import "./IngredientInput.scss";

import { Box, FormGroup, TextField } from "@mui/material";


type props = {
    stepIndex: number;
    index: number;
    // description: string;
    // amount: string;
}


/** Renders form inputs for a single ingredient.
 * @prop stepIndex: Number -> The step this ingredient is rendered from
 * @prop index: Number -> The position of this ingredient among its siblings
 *
 * @hierarchy IngredientInputList -> IngredientInput
*/
const IngredientInput = React.memo(function IngredientInput({
    stepIndex,
    index,
}:props){

    const [amountField, amountMeta] = useField(`steps[${stepIndex}].ingredients[${index}].amount`)
    const [descriptionField, descriptionMeta] = useField(`steps[${stepIndex}].ingredients[${index}].description`)

    // useEffect(()=>{
    //     console.log(amountField.name)
    // },[amountField])

    return (
        <Box className="Ingredient">
            <FormGroup row={true}>
                <TextField
                    className="Ingredient-text"
                    value={amountField.value}
                    variant="filled"
                    size="small"
                    name={amountField.name}
                    id={`S${stepIndex}I${index}-amount`}
                    label="amount"
                    fullWidth
                    onChange={amountField.onChange}
                    />
                <TextField
                    className="Ingredient-text"
                    value={descriptionField.value}
                    variant="filled"
                    size="small"
                    name={descriptionField.name}
                    id={`S${stepIndex}I${index}-description`}
                    label="ingredient"
                    onChange={descriptionField.onChange}
                    fullWidth
                    />
            </FormGroup>
        </Box>
    )
})

export default IngredientInput;