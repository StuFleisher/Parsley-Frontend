import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste } from "@fortawesome/free-solid-svg-icons";

import SimpleLayout from "../components/ui/SimpleLayout";
import userContext from "../helpers/userContext";
import "./WelcomePage.scss";

function WelcomePage() {

    const { username } = useContext(userContext);

    return (

        <SimpleLayout src="/images/banner01.jpg">
            <Box className="WelcomePage">
                <Typography component="h2" variant="h2">
                    {`Welcome to Parsley ${username}!`}
                </Typography>
                <Link component={RouterLink} to="/recipes/create" underline="none">
                    <Button
                        startIcon={<FontAwesomeIcon icon={faPaste} />}
                    >
                        <Typography variant="body1">
                            Let's add your first recipe!
                        </Typography>
                    </Button>
                </Link>
            </Box>

        </SimpleLayout>
    );
}

export default WelcomePage;