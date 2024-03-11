/** Handles the functionality for a button that adds/removes a recipe
 * from a cookbook.
 */

import "./CookbookButton.scss"
import { useCookbook } from "../../helpers/cookbookContext";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookBookmark } from '@fortawesome/free-solid-svg-icons';

type props = {
    recipe: SimpleRecipeData | Recipe;
}

function CookbookButton({recipe}:props) {
    const { isInCookbook, toggleInCookbook } = useCookbook();
    const [isProcessing, setIsProcessing] = useState(false);

    async function handleClick(e:React.MouseEvent){
        e.preventDefault();
        e.stopPropagation();

        try{

            if (!isProcessing){
                setIsProcessing(true);
                await toggleInCookbook(recipe);
                setIsProcessing(false);
            }
        } catch(err){
            console.warn("There was an error adding that recipe to your cookbook.  Was the page fully loaded?")
        }
    }

    return (
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
    );

}

export default CookbookButton;