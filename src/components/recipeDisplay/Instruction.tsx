import './Instruction.scss';
import { useEffect } from 'react';

function Instruction({instruction}:{instruction:string}){

    return (
        <p className="Instruction">{instruction}</p>
    )
}

export default Instruction