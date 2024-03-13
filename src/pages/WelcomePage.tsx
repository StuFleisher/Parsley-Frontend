import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste } from "@fortawesome/free-solid-svg-icons";

import SimpleLayout from "../components/ui/SimpleLayout";
import userContext from "../helpers/userContext";


function WelcomePage() {

    const { username } = useContext(userContext);

    return (

        <SimpleLayout src="/images/banner01.jpg">
            <Typography variant="h2">
                {`Welcome to Parsley ${username}!`}
            </Typography>
            <Typography variant="body1">
                Let's add your first recipe!
            </Typography>
            <Link component={RouterLink} to="/welcome">
                <IconButton>
                    <FontAwesomeIcon icon={faPaste} />
                </IconButton>
            </Link>

        </SimpleLayout>
    );
}

export default WelcomePage;