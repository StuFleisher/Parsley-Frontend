import UserRegistrationForm from "../components/user/UserRegistrationForm";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import "./RegistrationPage.scss";

type props = {
    register: (userInfo: IUser) => Promise<void>,
};

function RegistrationPage({ register }: props) {
    return (
        <Container className=" Page-container" maxWidth="xl">
            <Stack
                className="RegistrationPage"
                direction="column"
                justifyContent="center"
                alignItems="center"
            >

                <Box className="RegistrationPage-form">
                    <UserRegistrationForm register={register} />
                </Box>
                <Box
                    className="RegistrationPage"
                    component="img"
                    src="/images/banner01.jpg">
                </Box>

            </Stack>

        </Container>
    );
}

export default RegistrationPage;