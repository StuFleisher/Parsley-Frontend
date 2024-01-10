import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
    onSubmitCallback:Function,
}

function GenerateRecipeFromTextForm ({onSubmitCallback}:Props){

    const [formData, setFormData] = useState({});

    function handleSubmit(evt:FormEvent<HTMLFormElement>){
        evt.preventDefault();
        onSubmitCallback(formData);
    }

    function handleChange(evt:ChangeEvent<HTMLTextAreaElement>){
        setFormData((fdata)=>{
            return {
                ...fdata,
                [evt.target.name]:evt.target.value,
            }
        })
    }

    return (
        <form onSubmit={e=>handleSubmit(e)}>
            <TextareaAutosize
                name='recipeText'
                onChange={evt=>handleChange(evt)}
            />
            <input type="submit" value='Generate' />
        </form>
    )
}

export default GenerateRecipeFromTextForm;