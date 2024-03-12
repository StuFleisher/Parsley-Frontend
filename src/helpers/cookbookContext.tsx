import React, { useState, useContext, useEffect } from "react";

import ParsleyAPI from "./api";
import userContext from "./userContext";
import { emptyRecipeList } from "./recipeFactory";

type CookbookContextObject = {
  cookbook: SimpleRecipeData[];
  isInCookbook:(recipe: SimpleRecipeData | Recipe) => boolean;
  toggleInCookbook: (recipe: SimpleRecipeData | Recipe) => Promise<void>;
};

const cookbookContext = React.createContext<CookbookContextObject | null>(null);

/** custom hook exposing {cookbook, toggleInCookbook} from
 * inside a CookbookProvider wrapper.
*/
function useCookbook():CookbookContextObject {
  const context = useContext(cookbookContext);
  if (!context) throw new Error ("useCookbook must be used inside of a CookbookProvider Component")
  return context;
};

type props = {
  children: any,
  cookbookOwner: string,
}

/** Wrapper for cookbook context.  Provides access to functions for reading and updating
 * a user's cookbook.
 */
function CookbookProvider({ cookbookOwner, children }: props) {

  const [cookbook, setCookbook] = useState<SimpleRecipeData[]>(emptyRecipeList);
  const loggedInUser = useContext(userContext);

  useEffect(function fetchCookbookOnMount() {
    async function fetchCookbook() {
      if (cookbookOwner) {
        setCookbook(await ParsleyAPI.getCookbook(cookbookOwner));
      }
    }

    fetchCookbook();
  }, [cookbookOwner, setCookbook]);

  async function toggleInCookbook(recipe: SimpleRecipeData | Recipe):Promise<void> {
    const simpleRecipe: SimpleRecipeData = {
      recipeId: recipe.recipeId,
      name: recipe.name,
      owner: recipe.owner,
      description: recipe.description,
      sourceUrl: recipe.sourceUrl ? recipe.sourceUrl : "",
      sourceName: recipe.sourceName,
      imageSm: recipe.imageSm ? recipe.imageSm : "",
      imageMd: recipe.imageMd ? recipe.imageMd : "",
      imageLg: recipe.imageLg ? recipe.imageLg : "",
    };
    if (isInCookbook(simpleRecipe)) {
      await removeFromCookbook(simpleRecipe);
    } else {
    await addToCookbook(simpleRecipe);
    }
  }

  /** given a recipe and a cookbook, returns true if the cookbook contains
       * a match for that recipe and false if it does not.
       */
  function isInCookbook(recipe: SimpleRecipeData | Recipe) {
    return cookbook.some((entry) => {
      return entry.recipeId === recipe.recipeId;
    });
  }

  /** Handles adding api calls and state updates related to adding a
   * recipe to a cookbook */
  async function addToCookbook(recipe: SimpleRecipeData) {

    if (!loggedInUser.username) throw new Error("Login required");
    await ParsleyAPI.addToCookbook(recipe.recipeId, loggedInUser.username);
    setCookbook(() => [...cookbook, recipe]);
  }

  /** Handles adding api calls and state updates related to removing a
   * recipe from a cookbook */
  async function removeFromCookbook(recipe: SimpleRecipeData | Recipe) {
    if (!loggedInUser.username) throw new Error("Login required");
    await ParsleyAPI.removeFromCookbook(recipe.recipeId, loggedInUser.username);
    setCookbook(() => cookbook.filter(
      (entry) => {
        return (recipe.recipeId !== entry.recipeId);
      }
    ));
  }

  const cookbookContextObject: CookbookContextObject = {
    cookbook,
    isInCookbook,
    toggleInCookbook,
  };

  return (
    <cookbookContext.Provider value={cookbookContextObject}>
      {children}
    </cookbookContext.Provider>
  );
}


export { CookbookProvider, useCookbook };