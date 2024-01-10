import Step from "./Step";
import './StepsList.scss';

function StepsList ({steps}:{steps:IStep[]}){
    console.log("steps",steps)

    return (
        <div>
            {steps.map((step)=>{
                return (
                    <div className='Step' key={step.stepId}>
                        <Step step={step}/>
                    </div>
                )
            })}
        </div>
    )
}

export default StepsList