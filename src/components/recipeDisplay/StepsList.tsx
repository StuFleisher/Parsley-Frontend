import Box from "@mui/material/Box";

import Step from "./Step";
import './StepsList.scss';

function StepsList ({steps}:{steps:IStep[]}){


    return (
        <Box>
            {steps.map((step)=>{
                return (
                    <Box className='Step' key={"displayStep" + step.stepId}>
                        <Step step={step}/>
                    </Box>
                )
            })}
        </Box>
    )
}

export default StepsList