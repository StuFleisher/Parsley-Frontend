import { TextField, Stack, Button, Card } from "@mui/material"
import React, { useState } from "react";
import './loginForm.scss'

const DEFAULT_FORM_DATA:UserLoginData = {
    username:"",
    password:"",
}

type props = {
    login:Function,
}

const LoginForm = React.forwardRef( (
    {login}:props,
    ref:React.ForwardedRef<HTMLDivElement>)=>{

    const [formData,setFormData] = useState<UserLoginData>(DEFAULT_FORM_DATA)

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
        <Card className="LoginForm" ref={ref} tabIndex={-1}>
        <Stack spacing={2} >
            <Stack direction={{xs:"column", sm:"row"}} spacing={1}>
                <TextField
                    sx={{flexGrow:1}}
                    variant="outlined"
                    name="username"
                    label="Username"
                    onChange={handleChange}/>
                <TextField
                    sx={{flexGrow:1}}
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
})

export default LoginForm