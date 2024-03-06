import "./SimpleRecipeCard.scss";
import { useCookbook } from '../../helpers/cookbookContext';

import RecipeInfo from "./RecipeInfo";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

type props = {
    recipe: SimpleRecipeData | Recipe;
};

function SimpleRecipeCard({ recipe }: props) {
    const { isInCookbook, toggleInCookbook } = useCookbook();

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
                        backgroundImage: `url("${recipe.imageUrl}")`,
                    }}
                >
                    <Box className="IconBar">
                        <IconButton
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                return toggleInCookbook(recipe);
                            }}
                            className="CookbookIcon"
                        >
                            <FontAwesomeIcon
                                icon={isInCookbook(recipe) ? faBookBookmark : faBook}
                                className={
                                    isInCookbook(recipe)
                                        ? "CookbookIcon-remove"
                                        : "CookbookIcon-add"
                                }
                            />
                        </IconButton>
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