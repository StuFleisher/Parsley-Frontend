import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleLayout from "../components/ui/SimpleLayout";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingSpinner from "../components/ui/LoadingSpinner";

type props = {
    login: (credentials: UserLoginData) => Promise<void>,
};

export default function DemoLogin({login}:props) {

    const navigate = useNavigate();

    useEffect(function logInDemoUserOnMount(){
        async function logInDemoUser(){
            await login({username:"testUser",password:"password"})
            navigate("/")
        }
        setTimeout(logInDemoUser,1500);
    },[login, navigate])
    return (
        <SimpleLayout src="/images/banner01.jpg">
            <Stack width="80%"  alignItems={"center"} justifyContent={"spaceAround"} spacing={5} padding="2rem">
                <CircularProgress size="6rem" />
                <Typography variant="h3" align="center">
                    Logging in to demo account
                </Typography>
            </Stack>
        </SimpleLayout>
    )
}