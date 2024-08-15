import { Link } from "react-router-dom";
import { useContext } from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import RecipeInfo from "./RecipeInfo";
import FavoriteButton from "../ui/FavoriteButton";
import "./SimpleRecipeCard.scss";
import userContext from "../../helpers/userContext";
import { useTheme } from "@mui/material";
import EditButton from "../ui/EditButton";
import DeleteButton from "../ui/DeleteButton";

type props = {
    recipe: SimpleRecipeData | Recipe;
};

function SimpleRecipeCard({ recipe }: props) {

    const { username } = useContext(userContext);
    const theme = useTheme();

    return (
        <Stack>
             {username &&
                <Stack
                    className="IconBar"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    sx={{
                        height: { xs: "fit-content", sm: "100%" },
                        width: { xs: "100%", sm: "fit-content" },
                    }}
                >
                    {recipe.owner === username &&
                        <>
                            <EditButton recipe={recipe} />
                            <DeleteButton
                                recipe={recipe}
                            />
                        </>
                    }
                    <FavoriteButton recipe={recipe} />
                </Stack>}

            <Stack
                className="SimpleRecipeCard"
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
                    </Box>
                </Link>
                <Box className="SimpleRecipeCard-RecipeInfo"
                    order={{ xs: 3, sm: 2 }}
                >
                    <RecipeInfo recipe={recipe} variant="simple" />
                </Box>


            </Stack>

        </Stack>
    );
}

export default SimpleRecipeCard;