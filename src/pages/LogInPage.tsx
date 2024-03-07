import LoginForm from "../components/user/loginForm";
import SimpleLayout from "../helpers/SimpleLayout";

import Box from "@mui/material/Box";

import "./LogInPage.scss";

type props = {
    login: (credentials: UserLoginData) => Promise<void>,
};

function LogInPage({ login }: props) {
    return (
        <SimpleLayout src="/images/banner01.jpg">
                <LoginForm login={login} />
        </SimpleLayout>

    );
}

export default LogInPage;