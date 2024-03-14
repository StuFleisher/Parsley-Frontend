
import { Link as RouterLink } from "react-router-dom";

import Lottie from "lottie-react";
import explainerAnimation from "../animations/recipeTransform.json";

import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import UserRegistrationForm from "../components/userAuth/UserRegistrationForm";
import './Homepage.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

type props = {
    register: (userInfo: IUser) => Promise<void>,
};

function Homepage({ register }: props) {

    return (
        <div className="Homepage">

            {/* HERO SECTION */}
            <Stack
                component="section"
                className="Hero"
                direction={{ xs: "column", sm: "row" }}
            >
                <Stack
                    className="Hero-headlinePanel headlinePanel-left"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                >
                    <Typography component="h1" variant="h1">
                        Recipes should be easy to use
                    </Typography>
                    <Typography variant="body2">
                        Recipes have had the same format for over a century, but the way we cook has changed.  It’s time for a layout that works for the home chef.
                    </Typography>
                </Stack>
                <Stack
                    className="Hero-imagePanel imagePanel"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        component="img"
                        src="/images/hero-banner.jpg">
                    </Box>
                    {/* <Box className="Homepage-animation"> */}
                        <Lottie loop animationData={explainerAnimation} className="Homepage-animation"/>
                    {/* </Box> */}

                </Stack>
            </Stack>

            {/* Features section */}
            <Stack
                className="Features"
                alignItems="center"
                justifyContent="center"
                component="section"
                spacing={3}
                direction={{ xs: "column", sm: "row" }}
            >
                <Box className="Features-feature">
                    <Box
                        className="Features-featureIcon"
                        component="img"
                        src="/images/plate_01.png"
                    />
                    <Typography component='h3' variant='h3'>
                        Create
                    </Typography>
                    <Typography variant='body1'>
                        Copy/paste any recipe and we’ll format it for you.
                    </Typography>
                </Box>
                <Box className="Features-feature">
                    <Box
                        className="Features-featureIcon"
                        component="img"
                        src="/images/plate_02.png"
                    />
                    <Typography component='h3' variant='h3'>
                        Save
                    </Typography>
                    <Typography variant='body1'>
                        Save your favorite recipes to your cookbook for future meals.                    </Typography>
                </Box>
                <Box className="Features-feature">
                    <Box
                        className="Features-featureIcon"
                        component="img"
                        src="/images/plate_03.png"
                    />
                    <Typography component='h3' variant='h3'>
                        Cook
                    </Typography>
                    <Typography variant='body1'>
                        Bring Parsley into the kitchen and enjoy an easier way to cook.                    </Typography>
                </Box>

            </Stack>

            {/* Register SECTION */}
            <Box
                className="CTA"
            >
                <Stack
                    component="section"
                    direction={{ xs: "column-reverse", sm: "row" }}
                    className="CTA-container"
                >
                    <Stack
                        className="CTA-imagePanel imagePanel"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            component="img"
                            src="/images/banner01.jpg">
                        </Box>
                        <Box className="CTA-form">
                            <UserRegistrationForm register={register} />
                        </Box>

                    </Stack>
                    <Stack
                        className="CTA-headlinePanel headlinePanel-right"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        spacing={2}
                    >
                        <Typography component="h1" variant="h1">
                            Let's get Cookin'.
                        </Typography>
                        <Typography variant="body2">
                            Sign up for free and change the way you cook forever.
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            {/* addRecipe SECTION */}
            <Box
                className="CTA"
            >
                <Stack
                    component="section"
                    direction={{ xs: "column-reverse", sm: "row" }}
                    className="CTA-container"
                >
                    <Stack
                        className="CTA-imagePanel imagePanel"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            component="img"
                            src="/images/banner01.jpg">
                        </Box>
                        <Stack className="CTA-addRecipeLink" alignItems={"center"} justifyContent={"center"}>
                            <Link component={RouterLink} to="/recipes/create" underline="none">
                                <IconButton                                >
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </IconButton>
                            </Link>
                            <Typography variant="body1">
                                Create a new recipe
                            </Typography>
                        </Stack>

                    </Stack>
                    <Stack
                        className="CTA-headlinePanel headlinePanel-right"
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        spacing={2}
                    >
                        <Typography component="h1" variant="h1">
                            Let's get Cookin'.
                        </Typography>
                        <Typography variant="body2">
                            Copy/Paste recipe text from anywhere to build beautifully formatted recipes!
                        </Typography>
                    </Stack>
                </Stack>
            </Box>



        </div>
    );
}

export default Homepage;