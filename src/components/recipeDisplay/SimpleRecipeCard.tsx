import "./SimpleRecipeCard.scss";

import RecipeInfo from "./RecipeInfo";
import { Link } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

type props = {
    recipe:SimpleRecipeData|Recipe;
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
                        width:{sm:'100px', md:"200px"},
                    }}
                />
            </Link>
            <RecipeInfo recipe={recipe}/>
        </Stack>
    </Card>
    )
}

export default SimpleRecipeCard;