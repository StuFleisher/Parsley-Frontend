import './Instruction.scss';

function Instruction({instruction}:{instruction:string}){


    return (
        <p className="Instruction">{instruction}</p>
    )
}

export default Instruction