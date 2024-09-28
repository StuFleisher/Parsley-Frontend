import React, { useState, useContext, useEffect } from "react";

import ParsleyAPI from "./api";
import userContext from "./userContext";
import { emptyRecipeList } from "./recipeFactory";

type FavoritesContextObject = {
  favorites: SimpleRecipeData[];
  isInFavorites:(recipe: SimpleRecipeData | Recipe) => boolean;
  toggleInFavorites: (recipe: SimpleRecipeData | Recipe) => Promise<void>;
};

const favoritesContext = React.createContext<FavoritesContextObject | null>(null);

/** custom hook exposing {favorites, toggleInFavorites} from
 * inside a FavoritesProvider wrapper.
*/
function useFavorites():FavoritesContextObject {
  const context = useContext(favoritesContext);
  if (!context) throw new Error ("useFavorites must be used inside of a FavoritesProvider Component")
  return context;
};

type props = {
  children: any,
  username: string,
}

/** Wrapper for favorites context.  Provides access to functions for reading and updating
 * a user's favorites.
 */
function FavoritesProvider({ username, children }: props) {

  const [favorites, setFavorites] = useState<SimpleRecipeData[]>(emptyRecipeList);
  const loggedInUser = useContext(userContext);

  useEffect(function fetchFavoritesOnMount() {
    async function fetchFavorites() {
      if (username) {
        setFavorites(await ParsleyAPI.getFavorites(username));
      }
    }

    fetchFavorites();
  }, [username, setFavorites]);

  async function toggleInFavorites(recipe: SimpleRecipeData | Recipe):Promise<void> {
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
      tags: recipe.tags,
      createdTime: recipe.createdTime,
    };
    if (isInFavorites(simpleRecipe)) {
      await removeFromFavorites(simpleRecipe);
    } else {
    await addToFavorites(simpleRecipe);
    }
  }

  /** given a recipe and a favorites, returns true if the favorites contains
       * a match for that recipe and false if it does not.
       */
  function isInFavorites(recipe: SimpleRecipeData | Recipe) {
    return favorites.some((entry) => {
      return entry.recipeId === recipe.recipeId;
    });
  }

  /** Handles adding api calls and state updates related to adding a
   * recipe to a favorites */
  async function addToFavorites(recipe: SimpleRecipeData) {

    if (!loggedInUser.username) throw new Error("Login required");
    await ParsleyAPI.addToFavorites(recipe.recipeId, loggedInUser.username);
    setFavorites(() => [...favorites, recipe]);
  }

  /** Handles adding api calls and state updates related to removing a
   * recipe from a favorites */
  async function removeFromFavorites(recipe: SimpleRecipeData | Recipe) {
    if (!loggedInUser.username) throw new Error("Login required");
    await ParsleyAPI.removeFromFavorites(recipe.recipeId, loggedInUser.username);
    setFavorites(() => favorites.filter(
      (entry) => {
        return (recipe.recipeId !== entry.recipeId);
      }
    ));
  }

  const favoritesContextObject: FavoritesContextObject = {
    favorites,
    isInFavorites,
    toggleInFavorites,
  };

  return (
    <favoritesContext.Provider value={favoritesContextObject}>
      {children}
    </favoritesContext.Provider>
  );
}


export { FavoritesProvider, useFavorites };