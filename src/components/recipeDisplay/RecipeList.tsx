import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SimpleRecipeCard from "./SimpleRecipeCard";
import userContext from "../../helpers/userContext";
import { CookbookProvider } from "../../helpers/cookbookContext";

type props = {
    recipes: SimpleRecipeData[];
};

function RecipeList({ recipes }: props) {

    const { username } = useContext(userContext);

    if(recipes.length===0){
        return (
            <Box>
                <Typography variant="h2" color="secondary">
                    Sorry, We couldn't find any relevant recipes.
                </Typography>
            </Box>
        )
    }

    return (
        <CookbookProvider username={username!}>
            <Box>
                {recipes.map((recipe, i) => {
                    return (
                        <SimpleRecipeCard
                            recipe={recipe}
                            key={i} />);
                })}

            </Box>
        </CookbookProvider>
    );
}

export default RecipeList;