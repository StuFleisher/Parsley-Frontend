import { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faUser, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

//MUI Components
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import LoginForm from "../userAuth/loginForm";
import ModalButton from "./ModalButton";

import userContext from "../../helpers/userContext";
import SearchBar from "./SearchBar";
import { ReactComponent as ParsleyLogo } from "../../ParsleyLogo.svg";
import "./NavBar.scss";

type props = {
    login: (credentials: UserLoginData) => Promise<void>;
};

function NavBar({ login }: props) {

    const { username } = useContext(userContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    let isOpen = Boolean(anchorEl);



    //Dropdown Menu functions
    function handleClickMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleCloseMenu() {
        setAnchorEl(null);
    }

    //JSX to render when a user is not logged in
    const anonLinkSection = (
        <>
            <Stack direction="row" spacing={0} className="NavBar-links">
                <Link
                    underline="hover"
                >
                    <ModalButton
                        component={<Button>Log In</Button>}
                    >
                        <LoginForm login={login} hideRegistrationLink></LoginForm>
                    </ModalButton>
                </Link>
                <Link
                    component={RouterLink} to="/register"
                    underline="hover"
                >
                    <Button color={'brightWhite'}>
                        Sign Up
                    </Button>
                </Link>
            </Stack>
        </>
    );

    //JSX to render when a user is logged in
    const userLinkSection = (
        <>
            <Stack direction="row" spacing={2} className="NavBar-links">
                <Link
                    component={RouterLink} to="/recipes/create"
                    underline="hover"
                >
                    <Tooltip title="New Recipe" color="primary">
                        <IconButton>
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Link
                    component={RouterLink} to="/recipes"
                    underline="hover"
                >
                    <Tooltip title="Recipes">

                        <IconButton>
                            <FontAwesomeIcon icon={faUtensils} />
                        </IconButton>
                    </Tooltip>

                </Link>

                <IconButton
                    onClick={handleClickMenu}
                >
                    <FontAwesomeIcon icon={faUser} />
                </IconButton>
            </Stack>
            <Menu
                className="NavBar-dropdown"
                open={isOpen}
                elevation={1}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
            >
                <Box className='NavBar-dropdownItems'>
                    <Link
                        component={RouterLink}
                        to={`/users/${username}/recipes`}
                        onClick={() => { handleCloseMenu(); }}
                    >
                        <MenuItem>
                            <Typography>
                                My Recipes
                            </Typography>
                        </MenuItem>
                    </Link>
                    <Link
                        component={RouterLink}
                        to={`/users/${username}/cookbook`}
                        onClick={() => { handleCloseMenu(); }}
                    >
                        <MenuItem>
                            <Typography>
                                My Cookbook
                            </Typography>
                        </MenuItem>
                    </Link>

                    <Divider />
                    <Link component={RouterLink} to={`auth/logout`}>
                        <MenuItem>
                            <Typography>
                                Log Out
                            </Typography>
                        </MenuItem>
                    </Link>
                </Box>
            </Menu>
        </>
    );



    return (
        <>
            <AppBar position="static" elevation={0}>
                <Stack className="NavBar">
                    <Stack direction="row" className="NavBar-home">
                        <Link component={RouterLink} to="/" className="NavBar-logo">
                            <ParsleyLogo /><span>Parsley</span>
                        </Link>
                    </Stack>

                    <Box
                        sx={{
                            display: { xs: "none", sm: "flex" },
                            height: "100%",
                            alignItems: "center",
                        }}
                    >
                        <SearchBar />
                    </Box>

                    {username
                        ?
                        userLinkSection
                        :
                        anonLinkSection
                    }


                </Stack>
            </AppBar>
        </>
    );

}


export default NavBar;