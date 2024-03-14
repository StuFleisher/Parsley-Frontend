/** Handles the functionality for a button that adds/removes a recipe
 * from a cookbook.
 */

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useCookbook } from "../../helpers/cookbookContext";
import "./CookbookButton.scss";

type props = {
    recipe: SimpleRecipeData | Recipe;
};

function CookbookButton({ recipe }: props) {
    const { isInCookbook, toggleInCookbook } = useCookbook();
    const [isProcessing, setIsProcessing] = useState(false);

    async function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        try {

            if (!isProcessing) {
                setIsProcessing(true);
                await toggleInCookbook(recipe);
                setIsProcessing(false);
            }
        } catch (err) {
            console.warn("There was an error adding that recipe to your cookbook.  Was the page fully loaded?");
        }
    }

    return (
        <Tooltip title={isInCookbook(recipe) ? "Remove from cookbook" : "Save to Cookbook"}>
            <IconButton
                onClick={handleClick}
                className="CookbookButton"
            >
                <FontAwesomeIcon
                    icon={isInCookbook(recipe) ? faBookBookmark : faBook}
                    className={
                        isInCookbook(recipe)
                            ? "CookbookButton-remove"
                            : "CookbookButton-add"
                    }
                />
            </IconButton>
        </Tooltip>
    );

}

export default CookbookButton;