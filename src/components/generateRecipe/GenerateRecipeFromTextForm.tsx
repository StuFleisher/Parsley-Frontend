// import TextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, FormEvent, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCutlery } from "@fortawesome/free-solid-svg-icons";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import "./GenerateRecipeFromTextForm.scss";

type Props = {
    onSubmit:Function,
}

function GenerateRecipeFromTextForm ({onSubmit}:Props){

    const [formData, setFormData] = useState({});

    function handleSubmit(evt:FormEvent<HTMLFormElement>){
        evt.preventDefault();
        onSubmit(formData);
    }

    function handleChange(evt:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        setFormData((fdata)=>{
            return {
                ...fdata,
                [evt.target.name]:evt.target.value,
            }
        })
    }

    return (
        <form onSubmit={e=>handleSubmit(e)} className="RecipeFromText">
            <Typography variant="h2" color="$primary" className="RecipeFromText-title">
                Create a new recipe
            </Typography>

            <TextField
                name='recipeText'
                multiline
                minRows={10}
                onChange={evt=>handleChange(evt)}
                placeholder={`Copy/Paste your raw recipe text here.  No need to tidy it up - we'll take care of that for you.
                `}
            />
            <Button
                type="submit"
                value='Generate'
                variant="contained"
                startIcon={<FontAwesomeIcon icon={faCutlery}/>}
            >Generate</Button>
        </form>
    )
}

export default GenerateRecipeFromTextForm;