import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import './UserRecipeNav.scss'

type props = {
    username: string;
    selected: "cookbook" | "recipes";
};


function UserRecipeNav({ username, selected }: props) {
    return (
        <Stack
            className="UserRecipesNav"
            alignItems="center"
            justifyContent="space-evenly"
            spacing={1}
            direction={{ xs: "column", sm: "row" }}
        >
            <Stack justifyContent="center">
                <Button
                    className={selected === "cookbook" ? "UserRecipesNav-button selected" : "UserRecipesNav-button"}
                    variant="outlined"
                    component={Link}
                    to={`/users/${username}/cookbook`}
                >
                    {username}'s Cookbook
                </Button>
            </Stack>
            <Stack justifyContent="center">
                <Button
                    className={selected === "recipes" ? "UserRecipesNav-button selected" : "UserRecipesNav-button"}
                    variant="outlined"
                    component={Link}
                    to={`/users/${username}/recipes`}
                >
                    {username}'s Recipes
                </Button>
            </Stack>
        </Stack>
    );
};

export default UserRecipeNav;