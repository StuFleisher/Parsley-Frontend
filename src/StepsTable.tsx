import Step from "./Step";

function StepsTable ({steps}:{steps:IStep[]}){
    return (
        <table>
            {steps.map((step)=>{
                return (
                    <tr>
                        <Step step={step} key={step.stepId}/>
                    </tr>
                )
            })}
        </table>
    )
}

export default StepsTable