import LoginForm from "../components/user/loginForm";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import "./LogInPage.scss";

type props = {
    login: (credentials: UserLoginData) => Promise<void>,
};

function LogInPage({ login }: props) {
    return (
        <Container className=" Page-container" maxWidth="xl">
            <Stack
                className="LogInPage"
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Box className="LoginPage-form">
                    <LoginForm login={login} />
                </Box>
                <Box
                    className="LogInPage"
                    component="img"
                    src="/images/banner01.jpg">
                </Box>

            </Stack>

        </Container >
    );
}

export default LogInPage;