import { useState, useContext, useEffect, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faUser, faPlusCircle, faBars } from "@fortawesome/free-solid-svg-icons";

//MUI Components
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import LoginForm from "../userAuth/loginForm";
import ModalButton from "./ModalButton";
import Hidden from "@mui/material/Hidden";
import { Modal, useMediaQuery, useTheme } from "@mui/material";

import userContext from "../../helpers/userContext";
import SearchBar from "./SearchBar";
import { ReactComponent as ParsleyLogo } from "../../ParsleyLogo.svg";
import "./NavBar.scss";

type props = {
    login: (credentials: UserLoginData) => Promise<void>;
};

function NavBar({ login }: props) {

    const [showLogin, setShowLogin] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { username } = useContext(userContext);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    //Dropdown Menu functions
    function handleClickMenu(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }
    function handleCloseMenu() {
        setAnchorEl(null);
        setShowAccountMenu(false);
        setShowMobileMenu(false);
    }

    //Close dropdown menus when the anchor element unmounts
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const handleResize = useCallback(() => {
        if (isSmallScreen && showAccountMenu) {
            setShowAccountMenu(false);
        }
        if (!isSmallScreen && showMobileMenu) {
            setShowMobileMenu(false);
        }
    }, [isSmallScreen, showAccountMenu, showMobileMenu]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);


    /************ Menu Item Display Elements by Auth ******************/
    const ANON_ITEMS = (
        <>
            {!username &&
                <>
                    {isSmallScreen && <Divider />}
                    <MenuItem
                        className="NavBar-menuItem"
                        component={Button}
                        onClick={() => setShowLogin(true)}
                    >
                        <Typography>

                            Log In
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        className="NavBar-menuItem"
                        component={RouterLink}
                        to="/auth/register"
                        onClick={() => setShowAccountMenu(false)}
                    >
                        <Typography>
                            Sign Up
                        </Typography>
                    </MenuItem>
                </>
            }
        </>
    );

    const USER_ITEMS = (
        <Box>
            {username &&
                <>
                    <MenuItem
                        className="NavBar-menuItem"
                        component={RouterLink}
                        to={`/users/${username}/recipes`}
                        onClick={() => { handleCloseMenu(); }}
                    >
                        <Typography>
                            My Recipes
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        className="NavBar-menuItem"
                        component={RouterLink}
                        to={`/users/${username}/cookbook`}
                        onClick={() => { handleCloseMenu(); }}
                    >
                        <Typography>
                            My Cookbook
                        </Typography>
                    </MenuItem>

                    <Divider />

                    <MenuItem component={RouterLink} to={`auth/logout`}>
                        <Typography>
                            Log Out
                        </Typography>
                    </MenuItem>

                </>
            }
        </Box>
    );

    /************ Menu Displays ******************/

    const ACCOUNT_MENU = (
        <Menu
            className="NavBar-dropdown"
            elevation={1}
            open={showAccountMenu}
            anchorEl={anchorEl}
            onClose={() => {
                setShowAccountMenu(false);
                handleCloseMenu();
            }}
        >
            <Box className="NavBar-dropdownItems">
                {ANON_ITEMS}
                {USER_ITEMS}
            </Box>
        </Menu >
    );

    const MOBILE_MENU = (
        <Menu
            className="NavBar-dropdown"
            elevation={1}
            open={showMobileMenu}
            anchorEl={anchorEl}
            onClose={() => {
                setShowMobileMenu(false);
                handleCloseMenu();
            }}
        >
            <Box className="NavBar-dropdownItems">
                {/** Show create button only for logged in users */
                username &&
                    <MenuItem
                        className="NavBar-menuItem"
                        onClick={() => { handleCloseMenu(); }}
                        component={RouterLink}
                        to="/recipes/create"
                    >
                        <Typography>
                            <FontAwesomeIcon icon={faPlusCircle} /> Create
                        </Typography>
                    </MenuItem>
                }
                <MenuItem
                    className="NavBar-menuItem"
                    onClick={() => { handleCloseMenu(); }}
                    component={RouterLink} to="/recipes"
                >
                    <Typography>
                        <FontAwesomeIcon icon={faUtensils} /> Recipes
                    </Typography>

                </MenuItem>
                <Divider/>

                {ANON_ITEMS}

                {USER_ITEMS}
            </Box>
        </Menu >
    );



    return (
        <>
            <AppBar position="static" elevation={0}>
                <Stack className="NavBar" flexWrap={"wrap"}>

                    <Stack direction="row" className="NavBar-home">
                        <Link component={RouterLink} to="/" className="NavBar-logo">
                            <ParsleyLogo /><span>Parsley</span>
                        </Link>
                    </Stack>

                    <Box
                        className="NavBar-links"
                        sx={{
                            order: {
                                xs: 2,
                                md: 3
                            }
                        }}
                    >

                        {/********************** Mobile Menu *******************/}

                        <Hidden smUp>
                            {/* <Stack direction="row"> */}


                            <Button
                                className="NavBar-button"
                                onClick={(e) => {
                                    handleClickMenu(e);
                                    setShowMobileMenu(true);
                                }}
                            >
                                <FontAwesomeIcon icon={faBars} />
                            </Button>
                            {/* </Stack> */}
                        </Hidden>

                        {/****************** Large Menu *******************/}
                        <Hidden smDown>
                            <Stack
                                direction="row"
                                justifyContent='flex-end'
                                alignItems={"center"}
                                className="NavBar-linkContainer"
                                flexBasis="300px"
                            >
                                <Button
                                    component={RouterLink} to="/recipes/create"
                                >
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                    <Typography component="span" className="icon-text-align">
                                        Create
                                    </Typography>
                                </Button>
                                <Divider />

                                <Button
                                    component={RouterLink} to="/recipes"
                                    sx={{ lineSpacing: 0 }}
                                >
                                    <FontAwesomeIcon icon={faUtensils} />
                                    <Typography component="span" className="icon-text-align">
                                        Recipes
                                    </Typography>
                                </Button>
                                <Button
                                    className="NavBar-button"
                                    onClick={(e) => {
                                        handleClickMenu(e);
                                        setShowAccountMenu(!showAccountMenu);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </Button>
                            </Stack>
                        </Hidden>
                        {/*****************************************/}

                    </Box>

                    {/*********** Search Bar ****************/}
                    <Box
                        sx={{
                            width: {
                                xs: "1000px",
                                md: "350px"
                            },
                            alignItems: "center",
                            order: {
                                xs: 3,
                                md: 2,
                            }
                        }}
                    >
                        <SearchBar></SearchBar>
                    </Box>

                    {
                        showAccountMenu &&
                        ACCOUNT_MENU
                    }
                    {
                        showMobileMenu &&
                        MOBILE_MENU
                    }
                    <Modal
                        open={showLogin}
                        onClose={() => { setShowLogin(false); }}
                        className="loginModal"
                    >
                        <Box
                            className="Modal-contents"
                        >
                            <LoginForm login={login} hideRegistrationLink></LoginForm>
                        </Box>
                    </Modal>

                </Stack>
            </AppBar >
        </>
    );

}


export default NavBar;