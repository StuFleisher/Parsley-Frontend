import "./NavBar.scss";

import { useState,useContext } from "react";
import userContext from "../../helpers/userContext";
import { Link as RouterLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUtensils, faUser } from "@fortawesome/free-solid-svg-icons";

//MUI Components
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";


const PARSLEY_ICON = (
    <svg width="24" height="24" viewBox="0 0 41 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M19.4262 0.112297C16.5815 0.899756 15.2965 3.41351 16.1658 6.49099C16.574 7.9365 16.1428 8.18994 15.0231 7.16239C13.9457 6.17317 12.8921 5.95999 11.6598 6.4813C10.5036 6.97032 9.85561 7.92573 9.8544 9.14213C9.85295 10.6535 10.6065 11.7138 13.1728 13.8105C16.8624 16.8251 17.3495 17.3055 18.0297 18.599L18.6692 19.8151L18.8042 28.536C18.8786 33.3324 18.9603 37.274 18.9854 37.2953C19.0108 37.3164 19.2023 37.4859 19.411 37.6722C19.9104 38.1172 21.2978 38.1069 21.7193 37.6547C21.9832 37.3713 22.0753 35.5451 22.1714 28.6647L22.2922 20.0305L22.9675 18.7385C23.5116 17.6969 24.3348 16.8412 27.2126 14.3242C30.3046 11.6201 30.8239 11.0678 31.0906 10.2009C31.2621 9.64406 31.3251 8.90139 31.2328 8.52693C30.8732 7.06678 29.068 5.9531 27.5698 6.26684C27.1911 6.34608 26.4834 6.74918 25.9972 7.16239C25.0652 7.9548 24.4345 7.94403 24.692 7.14021C25.44 4.80561 25.2743 2.93569 24.2092 1.69066C23.1443 0.445843 20.8985 -0.295105 19.4262 0.112297ZM2.12452 12.1875C0.19277 13.1867 -0.552348 15.4151 0.436712 17.2364C1.02435 18.3186 2.43295 19.3765 3.5877 19.6026C4.5811 19.797 4.51927 20.3535 3.50413 20.3535C3.0672 20.3535 2.22499 20.5714 1.63228 20.8379C0.741524 21.2385 0.496612 21.4859 0.220303 22.2643C-0.081366 23.1146 -0.0690476 23.3024 0.346865 24.1971C0.630178 24.8065 1.13087 25.385 1.64726 25.6994C2.42184 26.1712 2.65491 26.202 4.66057 26.0954C5.85613 26.0319 7.07875 25.9139 7.37777 25.8332C7.77822 25.7251 7.92121 25.7742 7.92121 26.0201C7.92121 26.2035 7.71059 26.4132 7.45312 26.486C7.19541 26.559 6.65197 26.9565 6.24548 27.3695C4.80911 28.828 5.45206 31.0605 7.57485 31.9845C9.29768 32.7345 11.0205 32.4614 13.0213 31.121C14.5108 30.1232 16.1839 28.0721 16.7759 26.5185C17.4106 24.8525 17.3498 22.4521 16.6387 21.1071C15.9416 19.7891 8.11226 12.8316 6.57686 12.166C5.26077 11.5954 3.25052 11.6051 2.12452 12.1875ZM34.3102 12.1927C33.7281 12.4496 31.5678 14.147 29.3091 16.1225C25.8581 19.1401 25.2313 19.7936 24.5676 21.0662C23.8582 22.4266 23.8107 22.6622 23.9087 24.3293C24.0437 26.6202 24.9905 28.4485 26.966 30.2319C28.4608 31.5816 29.7199 32.2097 31.2191 32.3529C35.1002 32.7243 37.1899 28.5493 34.0003 26.7957C33.4793 26.5093 33.0503 26.154 33.0467 26.0058C33.0385 25.6684 33.0332 25.6684 35.2002 26.0713C37.5447 26.5073 38.984 26.2425 40.0276 25.1826C42.133 23.0446 40.6317 20.3606 37.3273 20.3547C36.2873 20.3528 36.5411 19.9919 38.0415 19.3386C39.8457 18.5531 40.8017 17.4795 40.9539 16.0671C41.0174 15.4767 41.0005 14.7478 40.916 14.4476C40.7206 13.754 39.4528 12.4586 38.5714 12.0523C37.5696 11.5904 35.5224 11.6578 34.3102 12.1927Z" fill="#F9EFE0" />
    </svg>
);


function NavBarMUI() {

    const {username} = useContext(userContext);
    const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null);
    let isOpen = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLElement>){
        setAnchorEl(event.currentTarget)
    }
    function handleClose(){
        setAnchorEl(null);
    }

    const anonLinkSection = (
    <>
        <Stack direction="row" spacing={0} className="NavBar-links">
            <Link component={RouterLink} to="/auth/login">
                <Button color={'brightWhite'}>
                    Log In
                </Button>
            </Link>
            <Link component={RouterLink} to="/auth/register">
                <Button color={'brightWhite'}>
                    Sign Up
                </Button>
            </Link>
        </Stack>
    </>);

    const userLinkSection = (
        <>
            <Stack direction="row" spacing={2} className="NavBar-links">
                <Link component={RouterLink} to="/recipes">
                    <Button
                        color={'brightWhite'}
                        startIcon={<FontAwesomeIcon icon={faUtensils} />}
                        >
                        recipes
                    </Button>
                </Link>
                <Link component={RouterLink} to={`/users/${username}`}>
                    <IconButton
                        color={'brightWhite'}
                        onClick={handleClick}
                        >
                        <FontAwesomeIcon icon={faUser} />
                    </IconButton>
                </Link>
            </Stack>
            <Menu
                className="NavBar-dropdown"
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                <Box className='NavBar-dropdownItems'>
                    <Link component={RouterLink} to={`/users/${username}/cookbook`}>
                        <MenuItem>
                            <Typography>
                                My Cookbook
                            </Typography>
                        </MenuItem>
                    </Link>

                    <Link component={RouterLink} to={`/users/${username}`}>
                        <MenuItem>
                            <Typography>
                                Profile
                            </Typography>
                        </MenuItem>
                    </Link>
                    <Divider/>
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
        <AppBar position="static" elevation={0}>
            <Stack className="NavBar">
                <Stack direction="row" className="NavBar-home">
                    <Link component={RouterLink} to="/">
                        {PARSLEY_ICON} <span>Parsley</span>
                    </Link>
                </Stack>

                <Box
                    sx={{
                        display: { xs: "none", sm:"flex" },
                        height:"100%",
                        alignItems:"center",
                    }}
                >
                    <TextField
                        id="NavBar-search-box"
                        className="NavBar-search"
                        color="primary"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {username
                ?
                    userLinkSection
                :
                    anonLinkSection
                }


            </Stack>
        </AppBar>
    );

}


export default NavBarMUI;