/** Handles the functionality for a button that adds/removes a recipe
 * from a favorites list.
 */


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link as NavLink } from "react-router-dom";

import "./RecipeButton.scss";


type props = {
    recipe: SimpleRecipeData | Recipe;
};

function EditImageButton({ recipe }: props) {
    return (
        <Tooltip title={"Edit Image"}>
            <IconButton
            component={NavLink}
            to={`/recipes/${recipe.recipeId}/image`}

                className="RecipeButton"
            >
                <FontAwesomeIcon
                    icon={faCamera}
                />
            </IconButton>
        </Tooltip>
    );

}

export default EditImageButton;