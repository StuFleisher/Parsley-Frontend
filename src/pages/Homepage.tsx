import { useContext, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

import Lottie from "lottie-react";
import explainerAnimation from "../animations/recipeTransform.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import UserRegistrationForm from "../components/userAuth/UserRegistrationForm";
import './Homepage.scss';
import userContext from "../helpers/userContext";

type props = {
    register: (userInfo: IUser) => Promise<void>,
};

function Homepage({ register }: props) {

    const formatSection = useRef<HTMLDivElement | null>(null);

    const { username } = useContext(userContext);

    const anonCTA = (
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
    );

    const userCTA = (
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
    );

    return (
        <div className="Homepage">

            {/* HERO SECTION */}
            <Stack
                component="section"
                className="Hero"
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                    backgroundImage: `url('/images/alt-banner-02.jpg')`
                }}
            >
                <Stack
                    className="Headline-container"
                    direction="column"
                    alignItems="center"
                    justifyContent='center'
                    spacing={2}
                >
                    <Typography component="h1" variant="h1"
                        sx={{
                            fontSize: { 'md': '5.5rem', 'sm': '4rem', 'xs': '3rem' }
                        }}
                    >
                        The digital recipe book for home chefs
                    </Typography>
                    <IconButton
                        className="Hero-next"
                        sx={{
                            fontSize: { 'md': '4rem', 'sm': '3.5rem', 'xs': '3rem' }
                        }}
                        onClick={() => {
                            window.scrollTo({
                                behavior: "smooth",
                                top: formatSection.current!.offsetTop + 200,
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleArrowDown} />
                    </IconButton>
                </Stack>
                <Box width={'80%'}>
                </Box>
                <Stack
                    className="Hero-more"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography>
                        See what makes a Parsley recipe special
                    </Typography>
                </Stack>
            </Stack>

            {/* FORMAT SECTION */}
            <Stack
                component="section"
                id="format"
                className="Format"
                ref={formatSection}
                direction={{ xs: "column", sm: "row" }}
                sx={{
                    backgroundImage: 'url(/images/hero-banner.jpg)'
                }}
            >
                <Stack
                    className="Format-headlinePanel headlinePanel-left"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}
                >
                    <Typography component="h1" variant="h1">
                        Never lose your place again
                    </Typography>
                    <Typography variant="body2">
                        Parsley uses AI to reformat your favorite recipes, putting each ingredient right next to the instructions where it is required.
                    </Typography>
                </Stack>
                <Stack
                    className="Format-contents"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Lottie loop animationData={explainerAnimation} className="Homepage-animation" />
                </Stack>
            </Stack>

            {/* Features section */}
            <Stack
                justifyContent="center"
                alignItems="center"
                className="Features"
            >

                <Typography variant="h1" component="h2">
                    Three ways to add your favorite recipes
                </Typography>
                <Box
                    className="Features-grid"
                    component="section"
                >
                    <Link component={RouterLink} to="/recipes/create" className="Features-feature">
                        <Box
                            className="Features-featureIcon"
                            component="img"
                            src="/images/plate_01.png"
                        />
                        <Typography component='h3' variant='h3'>
                            Text
                        </Typography>
                        <Typography variant='body1'>
                            copy/paste from anywhere to build beautifully formatted recipes                        </Typography>
                    </Link>

                    <Link component={RouterLink} to="/recipes/create" className="Features-feature">
                        <Box
                            className="Features-featureIcon"
                            component="img"
                            src="/images/plate_02.png"
                        />
                        <Typography component='h3' variant='h3'>
                            Image
                        </Typography>
                        <Typography component='p' variant='body1'>
                            Snap a photo of grandma’s recipe book to quickly digitize recipes                    </Typography>
                    </Link>

                    <Link component={RouterLink} to="/recipes/create" className="Features-feature">
                        <Box
                            className="Features-featureIcon"
                            component="img"
                            src="/images/plate_03.png"
                        />
                        <Typography component='h3' variant='h3'>
                            AI
                        </Typography>
                        <Typography variant='body1'>
                            Ask our robot chef to cook up something special just for you                    </Typography>
                    </Link>

                </Box>
            </Stack>

            {/* CTA SECTION */}

            {username ? userCTA : anonCTA}




        </div>
    );
}

export default Homepage;