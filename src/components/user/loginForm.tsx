import { TextField, Stack, Button, Box, Card } from "@mui/material"
import React, { useState } from "react";
import ParsleyAPI from "../../helpers/api";

const DEFAULT_FORM_DATA:UserLoginData = {
    username:"",
    password:"",
}

type props = {
    login:Function,
}

function LoginForm ({login}:props){

    const [formData,setFormData] = useState<UserLoginData>(DEFAULT_FORM_DATA)
    console.log(formData);

    function handleChange(evt:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = evt.target;
        setFormData((currentFormData)=>{
            return {
                ...currentFormData,
                [name]:value,
            }
        });
    }

    return (
        <Card>
        <Stack spacing={2} >
            <Stack direction="row" spacing={1}>
                <TextField
                    variant="outlined"
                    name="username"
                    label="Username"
                    onChange={handleChange}/>
                <TextField
                    variant="outlined"
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}/>
            </Stack>
            <Button
                variant="contained"
                onClick={()=>{login(formData)}}>
                    Log In
            </Button>
        </Stack>
        </Card>
    )
}

export default LoginForm