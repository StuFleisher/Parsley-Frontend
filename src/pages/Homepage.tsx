import LoginForm from "../components/user/loginForm";
import { useContext } from "react";
import userContext from "../helpers/userContext";
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
            <Stack direction="row">
                <Box
                component="img"
                className="Homepage-backgroundImage"
                src={"/images/parsley_leaf.png"}></Box>

                <Stack className="Homepage-copy" spacing={2}>
                    <Typography variant="body1" color="charcoal"> We've been cooking the same way for over a century</Typography>
                    <Typography variant="h1" color="secondary"> It's time to rethink recipes</Typography>
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