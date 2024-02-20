import LoginForm from "../components/user/loginForm";
import { useContext } from "react";
import userContext from "../helpers/userContext";

import Lottie from "lottie-react";
import testAnimation from "../animations/recipeTransform.json"

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import './Hompage.scss';

type props = {
    login: Function,
    register: Function,
};

function Homepage({ login, register }: props) {

    const { username } = useContext(userContext);

    return (
        <div className="Homepage">
            <Stack
                direction={{xs:"column", md:"row"}}
                alignItems="center"
                className="Homepage-introSection"
            >
                <Box className="Homepage-animation">
                    <Lottie loop animationData={testAnimation}/>
                </Box>
                <Stack className="Homepage-copy" spacing={2}>
                    <Typography variant="h1" color="secondary"> Recipes should be easy to use</Typography>
                    {username
                        ?
                        <></>
                        :
                        <LoginForm
                            login={login} />}
                </Stack>
            </Stack>
        </div>
    );
}

export default Homepage;