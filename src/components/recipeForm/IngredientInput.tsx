import React, { ChangeEvent, MouseEvent } from "react";
import "./IngredientInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Box, FormGroup, TextField } from "@mui/material";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useRecipeFormCallbacks } from "./RecipeFormControl";

type props = {
    ingredient: IngredientFormData;
    stepIndex: number;
    index: number;
}


/** Renders form inputs for a single ingredient.
 * @prop ingredient: IIngredient -> {amount:string, description:string}
 * @prop stepIndex: Number -> The step this ingredient is rendered from
 * @prop index: Number -> The position of this ingredient among its siblings
 * @prop updateIngredients:Function -> The callback that updates this ingredient
 *       in state for the recipe
 * @prop deleteIngredient:Function -> The callback that removes this ingredient
 *       from the recipe in state.
 *
 * @hierarchy IngredientInputList -> IngredientInput
*/
const IngredientInput = React.memo(function IngredientInput({
    ingredient,
    stepIndex,
    index
}:props) {
    const {amount, description} = ingredient;
    console.log(ingredient)

    const {updateIngredients, deleteIngredient} = useRecipeFormCallbacks();

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const newIngredient = {
            ...ingredient,
            [e.target.name]:e.target.value
        }

        updateIngredients(stepIndex, index, newIngredient.amount.value, newIngredient.description.value)
    }

    function handleDelete(e: MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        deleteIngredient(stepIndex, index)
    }

    return (
        <Box className="Ingredient">
            <FormGroup row={true}>
                <TextField
                    className="Ingredient-text"
                    value={amount.value}
                    variant="filled"
                    size="small"
                    name="amount"
                    id={`S${stepIndex}I${index}-amount`}
                    label="amount"
                    fullWidth
                    onChange={handleChange}
                    />
                <TextField
                    className="Ingredient-text"
                    value={description.value}
                    variant="filled"
                    size="small"
                    name="description"
                    id={`S${stepIndex}I${index}-description`}
                    label="ingredient"
                    onChange={handleChange}
                    fullWidth
                    />
            </FormGroup>

            <Box
                className="IngredientInput-delete"
                component="button"
                onClick={handleDelete}
            >
                <FontAwesomeIcon icon={faCircleXmark}/>
            </Box>
        </Box>
    )
})

export default IngredientInput;