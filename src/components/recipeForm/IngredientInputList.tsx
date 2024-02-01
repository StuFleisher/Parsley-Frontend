import IngredientInput from "./IngredientInput";
import "./IngredientInputList.scss"
import { MouseEvent } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";

type props = {
    ingredients: IIngredient[];
    updateIngredients:Function;
    createIngredient:Function;
    deleteIngredient:Function;
    stepIndex:number;
}

function IngredientInputList({
    ingredients,
    updateIngredients,
    createIngredient,
    deleteIngredient,
    stepIndex }: props) {

    function handleCreate(e:MouseEvent<HTMLElement>){
        createIngredient(stepIndex)
    }

    return (
        <>

            <Stack className="IngredientList"
                direction = {{xs:"column", sm:"row", md:"column"}}
            >
                {ingredients.map((ingredient, i)=>{
                    return (
                    <ListItem className="IngredientList-item" key={i}>
                        <IngredientInput
                            ingredient={ingredient}
                            index={i}
                            stepIndex = {stepIndex}
                            updateIngredients={updateIngredients}
                            deleteIngredient={deleteIngredient}
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
}

export default IngredientInputList;