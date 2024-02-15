import { useState, useEffect, useContext } from "react";

import SimpleRecipeCard from "./SimpleRecipeCard";
import userContext from "../../helpers/userContext";
import { CookbookProvider } from "../../helpers/cookbookContext";

type props = {
    recipes: SimpleRecipeData[];
};

function RecipeList({ recipes }: props) {

    const { username } = useContext(userContext);

    return (
        <CookbookProvider username={username!}>
            <div>
                {recipes.map((recipe, i) => {
                    return (
                        <SimpleRecipeCard
                            recipe={recipe}
                            key={i} />);
                })}

            </div>
        </CookbookProvider>
    );
}

export default RecipeList;