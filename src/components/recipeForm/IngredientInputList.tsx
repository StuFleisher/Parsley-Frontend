import IngredientInput from "./IngredientInput";
import "./IngredientInputList.scss"
import { MouseEvent } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";

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
        <ul className="IngredientList">
            {ingredients.map((ingredient, i)=>{
                return (
                <li className="IngredientList-item" key={i}>
                    <IngredientInput
                        ingredient={ingredient}
                        index={i}
                        stepIndex = {stepIndex}
                        updateIngredients={updateIngredients}
                        deleteIngredient={deleteIngredient}
                    />
                </li>)
            })}
            <li
                className="IngredientList-icon"
                onClick={handleCreate}
            > <PlusCircleFill/> </li>
        </ul>
    )
}

export default IngredientInputList;