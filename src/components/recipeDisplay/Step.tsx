import IngredientList from "./IngredientList";
import Instruction from "./Instruction";
import './Step.scss';

function Step({step}:{step:IStep}){

    const {stepNumber, instructions, ingredients} = step;

    return (
        <>
            <div className="Step-number">{stepNumber}</div>
            <div className="Step-ingredients">
                <IngredientList ingredients={ingredients}/>
            </div>
            <div className="Step-instructions">
                <Instruction instruction={instructions}/>
            </div>
        </>
    )
}

export default Step