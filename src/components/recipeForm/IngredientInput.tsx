import { ChangeEvent, MouseEvent } from "react";
import "./IngredientInput.scss";
import { XCircleFill } from "react-bootstrap-icons";
import AutoResizeInput from "../ui/AutoResizeInput";

type props = {
    ingredient: IIngredient;
    stepIndex: number;
    index: number;
    updateIngredients:Function;
    deleteIngredient:Function;
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
function IngredientInput({
    ingredient,
    stepIndex,
    index,
    updateIngredients,
    deleteIngredient}:props) {
    const {amount, description} = ingredient;

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        const newIngredient = {
            ...ingredient,
            [e.target.name]:e.target.value
        }

        updateIngredients(stepIndex, index, newIngredient.amount, newIngredient.description)
    }

    function handleDelete(e: MouseEvent<HTMLDivElement>){
        deleteIngredient(stepIndex, index)
    }

    return (
        <div className="IngredientInput">
            <AutoResizeInput
                className="capsule-left"
                value={amount}
                name="amount"
                updateValue={handleChange}

            />
            <AutoResizeInput
                className="capsule-right"
                value={description}
                name="description"
                updateValue={handleChange}
                extraWidth={20}

            />
            <div
                className="IngredientInput-delete"
                onClick={handleDelete}
            >
                <XCircleFill/>
            </div>
        </div>
    )
}

export default IngredientInput;