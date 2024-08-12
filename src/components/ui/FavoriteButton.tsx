/** Handles the functionality for a button that adds/removes a recipe
 * from a favorites list.
 */

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useFavorites } from "../../helpers/favoritesContext";
import "./FavoriteButton.scss";

type props = {
    recipe: SimpleRecipeData | Recipe;
};

function FavoriteButton({ recipe }: props) {
    const { isInFavorites, toggleInFavorites } = useFavorites();
    const [isProcessing, setIsProcessing] = useState(false);

    async function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        try {

            if (!isProcessing) {
                setIsProcessing(true);
                await toggleInFavorites(recipe);
                setIsProcessing(false);
            }
        } catch (err) {
            console.warn("There was an error adding that recipe to your favorites.  Was the page fully loaded?");
        }
    }

    return (
        <Tooltip title={isInFavorites(recipe) ? "Remove from Favorites" : "Save to Favorites"}>
            <IconButton
                onClick={handleClick}
                className="FavoriteButton"
            >
                <FontAwesomeIcon
                    icon={isInFavorites(recipe) ? faBookBookmark : faBook}
                    className={
                        isInFavorites(recipe)
                            ? "FavoriteButton-remove"
                            : "FavoriteButton-add"
                    }
                />
            </IconButton>
        </Tooltip>
    );

}

export default FavoriteButton;