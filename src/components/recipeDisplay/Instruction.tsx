import './Instruction.scss';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

type props = {
    instruction: string;
    colorMap: Map<string, string>;
};

function Instruction({ instruction, colorMap }: props) {

    function highlightText(text = instruction, map = colorMap) {
        for (let entry of map) {
            if (entry[0]!==""){
                text = text.replaceAll(entry[0], `*${entry[0]}*`);
            }
        }

        let textArray = text.split('*');
        let jsxArray = textArray.map(str => {
            return (
                <Typography
                    component="span"
                    variant="body2"
                    className={
                        map.has(str) ? `Instruction color-${map.get(str)}` : "Instruction"
                    }
                >
                    {str}
                </Typography>);
        });

        return jsxArray.reduce((accumulator:null | JSX.Element, curr:any) => {
            return accumulator === null ? curr : <>{accumulator}{curr}</>
        }, null);
    }



    return highlightText(instruction);
    // return <p className="Instruction">{instruction}</p>
    }

export default Instruction;