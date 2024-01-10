import IngredientInputList from "./IngredientInputList";
import InstructionInput from "./InstructionInput";
import "./StepInput.scss";

type props = {
    step:IStep,
    index:number,
    updateInstruction:Function,
    updateIngredients:Function,
    deleteIngredient:Function,
    createIngredient:Function,
}

/** Renders components for updating a step
 *
 * @prop step:IStep -> the data for the step itself
 * @prop index:number -> the steps index in the master list of steps
 *
 * StepsInputs > StepInput > {IngredientInputList, InstructionInput}
 */

function StepInput({step,
    index,
    updateInstruction,
    updateIngredients,
    deleteIngredient,
    createIngredient}:props){

    const {stepNumber, instructions, ingredients} = step;


    return (
        <>
            <div className="Step-number">{stepNumber}</div>
            <div className="Step-ingredients">
                <IngredientInputList
                    ingredients={ingredients}
                    stepIndex={index}
                    updateIngredients={updateIngredients}
                    createIngredient={createIngredient}
                    deleteIngredient={deleteIngredient}
                />
            </div>
            <div className="Step-instructions">
                <InstructionInput
                    instruction={instructions}
                    stepIndex={index}
                    updateInstruction={updateInstruction}
                />
            </div>
        </>
    )
}

export default StepInput