/** Handles the functionality for a button that adds/removes a recipe
 * from a favorites list.
 */


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link as NavLink } from "react-router-dom";

import "./RecipeButton.scss";


type props = {
    recipe: SimpleRecipeData | Recipe;
};

function EditButton({ recipe }: props) {
    return (
        <Tooltip title={"Edit Recipe"}>
            <IconButton
            component={NavLink}
            to={`/recipes/${recipe.recipeId}/edit`}

                className="RecipeButton"
            >
                <FontAwesomeIcon
                    icon={faPencil}
                />
            </IconButton>
        </Tooltip>
    );

}

export default EditButton;