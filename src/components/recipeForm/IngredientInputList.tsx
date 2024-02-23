import IngredientInput from "./IngredientInput";
import "./IngredientInputList.scss";
import React, { useCallback } from "react";
import { useFormikContext, FieldArray, FieldArrayRenderProps } from "formik";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";

type props = {
    stepIndex: number;
};

const emptyIngredient = {
    amount:"",
    description:"",
}

const IngredientInputList = React.memo(
    function IngredientInputList({stepIndex}:props) {

        const { values, handleChange, handleBlur, errors, touched } = useFormikContext<IRecipe | RecipeForCreate>();
        const ingredients = values.steps[stepIndex].ingredients;


        const renderIngredientInput = useCallback((arrayHelpers: FieldArrayRenderProps) =>{
            return (
                <>
                {ingredients.map((ingredient, i) => {
                    return (
                        <Stack className="IngredientList" key={`step-${stepIndex}-ingredient-${i}`}
                            direction={{ xs: "column", md: "row" }}
                        >
                            <ListItem className="IngredientList-item">
                                <IngredientInput
                                    index={i}
                                    stepIndex={stepIndex}
                                    // amount={ingredient.amount}
                                    // description={ingredient.description}
                                />
                            <Box
                                className="IngredientInput-delete"
                                component="button"
                                type="button"
                                onClick={()=>{arrayHelpers.remove(i)}}
                            >
                                <FontAwesomeIcon icon={faCircleXmark}/>
                            </Box>
                            </ListItem>
                        </Stack>
                    );
                })}
                <Box>
                    <Button
                        startIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                        variant="outlined"
                        color="primary"
                        onClick={()=>{arrayHelpers.push(emptyIngredient)}}
                    >
                        Add an Ingredient
                    </Button>
                </Box>
                </>
            )
        },[ingredients,stepIndex])

        return (
            <>
                <FieldArray
                    name={`steps[${stepIndex}].ingredients`}
                    render={(arrayHelpers)=>(renderIngredientInput(arrayHelpers))}
                />
            </>
        );
    });


export default IngredientInputList;