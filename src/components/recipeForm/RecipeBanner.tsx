import { Modal, Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import RecipeImageForm from "./RecipeImageForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./RecipeBanner.scss"

type props = {
    image: Blob | undefined;
    imageUrl: string | undefined;
    updateImage: (file: Blob) => void;
    editable?: boolean;
};

function RecipeBanner({ updateImage, image, imageUrl, editable = false }: props) {
    const [showModal, setShowModal] = useState(false);

    function closeModal() {
        setShowModal(false);
    }

    function handleUpdate(file: Blob) {
        closeModal();
        updateImage(file);
    }

    return (
        <>
            <Box component="img"
                src={image ? URL.createObjectURL(image) : imageUrl}
                className="RecipeBanner"
            />
            {editable
                ?
                <>
                    <Modal
                        open={showModal}
                        onClose={closeModal}
                    >
                        <Box className="EditImageModal">
                            <RecipeImageForm updateRecipeImage={handleUpdate} />
                        </Box>
                    </Modal>
                    <Box  className="RecipeBanner-editButton">

                        <IconButton
                            className="RecipeInfo-editImage"
                            onClick={() => { setShowModal(true); }}
                            size="large"
                            // variant="contained"
                            color="brightWhite"
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </IconButton>
                    </Box>
                </>
                :
                null
            }

        </>

    );
}

export default RecipeBanner;