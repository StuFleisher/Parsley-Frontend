import { Link } from "react-router-dom";
import { useContext } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import RecipeInfo from "./RecipeInfo";
import FavoriteButton from "../ui/FavoriteButton";
import "./SimpleRecipeCard.scss";
import userContext from "../../helpers/userContext";

type props = {
    recipe: SimpleRecipeData | Recipe;
};

function SimpleRecipeCard({ recipe }: props) {

    const { username } = useContext(userContext);

    return (
        <Stack
            className="SimpleRecipeCard"
            spacing={{ sm: 1, md: 2, lg: 3 }}
        >
            <Link
                to={`/recipes/${recipe.recipeId}`}
                className="SimpleRecipeCard-imageContainer"
            >
                <Box
                    className="SimpleRecipeCard-image"
                    component="div"
                    sx={{
                        backgroundImage: `url("${recipe.imageMd}")`,
                    }}
                >
                    {username &&
                        <Box className="IconBar">
                            <FavoriteButton recipe={recipe} />
                        </Box>}
                </Box>
            </Link>
            <Box className="SimpleRecipeCard-RecipeInfo">
                <RecipeInfo recipe={recipe} variant="simple"/>
            </Box>
        </Stack>
    );
}

export default SimpleRecipeCard;