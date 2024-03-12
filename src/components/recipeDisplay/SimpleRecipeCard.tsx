import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import RecipeInfo from "./RecipeInfo";
import CookbookButton from "../ui/CookbookButton";
import "./SimpleRecipeCard.scss";

type props = {
    recipe: SimpleRecipeData | Recipe;
};

function SimpleRecipeCard({ recipe }: props) {

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
                    <Box className="IconBar">
                        <CookbookButton recipe={recipe}/>
                    </Box>
                </Box>
            </Link>
            <Box className="SimpleRecipeCard-RecipeInfo">
                <RecipeInfo recipe={recipe} />
            </Box>
        </Stack>
    );
}

export default SimpleRecipeCard;