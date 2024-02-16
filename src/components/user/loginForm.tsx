import { TextField, Stack, Button, Card, Typography } from "@mui/material"
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
    const [error, setError] = useState<string|null>(null)

    function handleChange(evt:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = evt.target;
        setFormData((currentFormData)=>{
            return {
                ...currentFormData,
                [name]:value,
            }
        });
    }

    async function handleSubmit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        try{
            await login(formData)
        } catch (err:any) {
            setError("Invalid username/password");
        }
    }

    return (
        <Card className="LoginForm" ref={ref} tabIndex={-1}>
        <Stack spacing={2} component="form">
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
            {error ? <Typography variant="subtitle1" color="primary">{error}</Typography> : <></>}
            <Button
                variant="contained"
                type="submit"
                onClick={(e)=>{handleSubmit(e)}}>
                    Log In
            </Button>
        </Stack>
        </Card>
    )
})

export default LoginForm