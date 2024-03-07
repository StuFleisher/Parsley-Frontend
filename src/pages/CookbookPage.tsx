import "./CookbookPage.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import CookbookRecipes from "../components/recipeDisplay/CookbookRecipes";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { CookbookProvider } from "../helpers/cookbookContext";
import UserRecipeNav from "../components/user/UserRecipeNav";

function CookbookPage() {

    const { username } = useParams();
    console.log(username)

    return (
        <>
        {username && <UserRecipeNav
        username={username}
        selected="cookbook"
        />}
            {/* <Stack
                className="UserRecipesNav"
                alignItems="center"
                justifyContent="space-evenly"
                spacing={1}
                direction={{xs:"column",sm:"row"}}
            >
                <Stack justifyContent="center">
                    <Button
                        className="selected"
                        variant="outlined"
                        component={Link}
                        to={`/users/${username}/cookbook`}
                    >
                        {username}'s Cookbook
                    </Button>
                </Stack>
                <Stack justifyContent="center">
                    <Button
                        variant="outlined"
                        component={Link}
                        to={`/users/${username}/recipes`}
                    >
                        {username}'s Recipes
                    </Button>
                </Stack> */}

            {/* </Stack> */}
            <Container className="Page-container" maxWidth="xl">



                <CookbookProvider username={username!}>
                    <CookbookRecipes />

                </CookbookProvider>
            </Container>
        </>
    );
}

export default CookbookPage;
