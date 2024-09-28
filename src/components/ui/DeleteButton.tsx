/** Handles the functionality for a button that adds/removes a recipe
 * from a favorites list.
 */

import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import "./RecipeButton.scss";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import ParsleyAPI from "../../helpers/api";
import { useNavigate } from "react-router-dom";

type props = {
    recipe: SimpleRecipeData | Recipe;
};

function DeleteButton({ recipe }: props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function openModal(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
    }

    async function handleDelete(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        try {
            if (!isProcessing) {
                setIsProcessing(true);
                ParsleyAPI.DeleteRecipe(recipe.recipeId);
                setIsProcessing(false);
                navigate('/deleted');
            }
        } catch (err) {
            console.warn("There was an error adding that recipe to your favorites.  Was the page fully loaded?");
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={closeModal}
                className="loginModal"
            >
                <Box className="Modal-contents">
                    <form>
                        <Typography>
                            Are you sure you want to delete this recipe?
                        </Typography>
                        <Stack
                            direction="row"
                            justifyContent={"center"}
                        >

                            <Button
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>

            <Tooltip title={"Delete Recipe"}>
                <IconButton
                    onClick={(e) => openModal(e)}
                    className="RecipeButton"
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                    />
                </IconButton>
            </Tooltip>
        </>

    );

}

export default DeleteButton;