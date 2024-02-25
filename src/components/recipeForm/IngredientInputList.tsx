import IngredientInput from "./IngredientInput";
import "./IngredientInputList.scss"
import React, { MouseEvent } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { useRecipeFormCallbacks } from "./RecipeFormControl";

type props = {
    ingredients: IngredientFormData[];
    stepIndex:number;
}

const IngredientInputList = React.memo(
function IngredientInputList({
    ingredients,
    stepIndex }: props) {

    function handleCreate(e:MouseEvent<HTMLElement>){
        createIngredient(stepIndex)
    }

    const {createIngredient} = useRecipeFormCallbacks();

    return (
        <>

            <Stack className="IngredientList"
                direction = {{xs:"column", md:"row"}}
            >
                {ingredients.map((ingredient, i)=>{
                    return (
                    <ListItem className="IngredientList-item" key={i}>
                        <IngredientInput
                            ingredient={ingredient}
                            index={i}
                            stepIndex = {stepIndex}
                        />
                    </ListItem>)
                })}
            </Stack>

            <Box>
            <Button
                startIcon={<FontAwesomeIcon icon={faCirclePlus}/>}
                variant="outlined"
                color="primary"
                onClick={handleCreate}
            >Add an Ingredient
            </Button></Box>
        </>
    )
})


export default IngredientInputList;