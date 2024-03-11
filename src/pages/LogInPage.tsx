import LoginForm from "../components/userAuth/loginForm";
import SimpleLayout from "../components/ui/SimpleLayout";

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