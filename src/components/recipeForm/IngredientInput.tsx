import React from "react";
import {FastField } from "formik";
import FormikMuiTextField from "../ui/FormikMuiTextField";

import "./IngredientInput.scss";

import { Box, FormGroup } from "@mui/material";


type props = {
    stepIndex: number;
    index: number;
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

    // const [amountField, amountMeta] = useField(`steps[${stepIndex}].ingredients[${index}].amount`)
    // const [descriptionField, descriptionMeta] = useField(`steps[${stepIndex}].ingredients[${index}].description`)

    return (
        <Box className="Ingredient">
            <FormGroup row={true}>
                <FastField
                    component = {FormikMuiTextField}
                    className="Ingredient-text"
                    variant="filled"
                    size="small"
                    id={`steps[${stepIndex}].ingredients[${index}].amount`}
                    label="amount"
                    fullWidth
                    name={`steps[${stepIndex}].ingredients[${index}].amount`}
                />
                <FastField
                    component={FormikMuiTextField}
                    className="Ingredient-text"
                    variant="filled"
                    size="small"
                    id={`steps[${stepIndex}].ingredients[${index}].description`}
                    label="ingredient"
                    fullWidth
                    name={`steps[${stepIndex}].ingredients[${index}].description`}
                />
            </FormGroup>
        </Box>
    )
})

export default IngredientInput;