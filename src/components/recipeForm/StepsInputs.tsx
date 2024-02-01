import StepInput from "./StepInput";
import { MouseEvent } from "react";
import { XCircleFill } from "react-bootstrap-icons";
import './StepsInputs.scss';

type props = {
    initialSteps:IStep[];
    updateInstruction:Function;
    updateIngredients:Function;
    createIngredient:Function;
    deleteIngredient:Function;
    createStep:Function;
    deleteStep:Function;
}

/** Renders StepInput components for every Step passed to props
 *
 * @prop initialSteps: IStep[] ->
 */

function StepsInputs ({
    initialSteps,
    updateInstruction,
    updateIngredients,
    createIngredient,
    deleteIngredient,
    createStep,
    deleteStep}:props){

    function handleCreate(e:MouseEvent<HTMLDivElement>){
        const target = e.currentTarget as HTMLDivElement;
        createStep(Number(target.getAttribute('data-index'))+1);
    }

    function handleDelete(e:MouseEvent<HTMLDivElement>){
        const target = e.currentTarget as HTMLDivElement;
        deleteStep(Number(target.getAttribute('data-index')));
    }

    return (
        <div>
            {initialSteps.map((step,i)=>{
                return (
                    <div  key={i} className="StepInput">
                        <StepInput
                            step={step}
                            index={i}
                            updateInstruction={updateInstruction}
                            updateIngredients={updateIngredients}
                            deleteIngredient={deleteIngredient}
                            createIngredient={createIngredient}
                        />
                        <div
                            className="Step-delete"
                            data-index={i}
                            onClick={handleDelete}
                        >
                            <XCircleFill/>
                        </div>
                    </div>
            )
            })}
        </div>
    )
}

export default StepsInputs

