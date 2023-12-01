import IngredientList from "./IngredientList";
import Instruction from "./Instruction";

function Step({step}:{step:IStep}){

    const {stepNumber, instructions, ingredients} = step;

    return (
        <>
            <td>{stepNumber}</td>
            <td><IngredientList ingredients={ingredients}/></td>
            <td><Instruction instruction={instructions}/></td>
        </>
    )
}

export default Step