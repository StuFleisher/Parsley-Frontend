import "./SimpleRecipeCard.scss";

import RecipeInfo from "./RecipeInfo";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const DEFAULT_IMG_URL = "/images/chicken_curry.jpg"

type props = {
    recipe:SimpleRecipeData|IRecipe;
}

function SimpleRecipeCard({recipe}:props){

    return(
    <Card className="SimpleRecipeCard">
        <Stack
            direction="row"
            spacing={3}
        >
            <Link to={`/recipes/${recipe.recipeId}`}>
                <Box
                    component="img"
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    sx={{
                        height:{sm:'100px', md:"200px"},
                    }}
                />
            </Link>
            <RecipeInfo recipe={recipe}/>
        </Stack>
    </Card>
    )
}

export default SimpleRecipeCard;