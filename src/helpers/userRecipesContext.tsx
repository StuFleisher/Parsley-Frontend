import React, { useState, useContext, useEffect } from "react";

import ParsleyAPI from "./api";
import { emptyRecipeList } from "./recipeFactory";

type props = {
    children: any,
    owner: string,
};

const userRecipesContext = React.createContext<SimpleRecipeData[]|null>(null);

/** custom hook exposing the list of recipes for this user.
*/
function useUserRecipes():SimpleRecipeData[] {
    const context = useContext(userRecipesContext);
    if (!context) throw new Error ("useCookbook must be used inside of a CookbookProvider Component")
    return context;
  };


function UserRecipesProvider({ owner, children }: props) {

    const [userRecipes, setUserRecipes] = useState<SimpleRecipeData[]>(emptyRecipeList);

    useEffect(function fetchRecipesOnMount() {
        async function fetchRecipes() {
            if (owner) {
                setUserRecipes(await ParsleyAPI.getUserRecipes(owner));
            }
        }

        fetchRecipes();
    }, [owner, setUserRecipes]);


    return (
        <userRecipesContext.Provider value={userRecipes}>
          {children}
        </userRecipesContext.Provider>
      );
}

export {UserRecipesProvider, useUserRecipes, userRecipesContext};