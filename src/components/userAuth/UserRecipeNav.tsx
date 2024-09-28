import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import './UserRecipeNav.scss';
import { faHeart, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type props = {
    username: string;
    selected: "favorites" | "recipes";
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
                    className={selected === "favorites" ? "UserRecipesNav-button selected" : "UserRecipesNav-button"}
                    variant="outlined"
                    component={Link}
                    to={`/users/${username}/favorites`}
                >
                    <Typography>
                        <FontAwesomeIcon icon={faHeart} />&nbsp;
                        {username}'s Favorites
                    </Typography>
                </Button>
            </Stack>
            <Stack justifyContent="center">
                <Button
                    className={selected === "recipes" ? "UserRecipesNav-button selected" : "UserRecipesNav-button"}
                    variant="outlined"
                    component={Link}
                    to={`/users/${username}/recipes`}
                >
                    <Typography>
                        <FontAwesomeIcon icon={faUtensils} /> &nbsp;
                        {username}'s Recipes
                    </Typography>
                </Button>
            </Stack>
        </Stack>
    );
};

export default UserRecipeNav;