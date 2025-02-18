import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import "./RecipeBanner.scss"
import ImageForm from "../ui/ImageForm";

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

    function handleUpdate(file?: Blob|undefined) {
        closeModal();
        if (file){
            updateImage(file);
        }
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
                            <ImageForm onSubmit={handleUpdate} imageUrl={imageUrl}/>
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
                            <FontAwesomeIcon icon={faCamera} />
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