import {useState} from "react";

import RecipeInfoInput from "./RecipeInfoInput";
import StepsInputs from "./StepsInputs";
import RecipeImageForm from "./RecipeImageForm";

import { Box, Button, Modal, Typography } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import {useFormikContext} from "formik";

type Props = {
    recipe: RecipeForCreate | IRecipe,
    onSubmitCallback: Function,
  };

function RecipeFormDisplay() {

    const {handleSubmit} = useFormikContext();

    const [showModal, setShowModal] = useState(false);

    function closeModal(){
        setShowModal(false)
      }

    return (
        <>
        {/* <Modal
            open={showModal}
            onClose={closeModal}
        >
            <Box className="EditImageModal">
            <RecipeImageForm/>
            </Box>
        </Modal> */}

        {/* <Box component="img"
            src={image ? URL.createObjectURL(image) : recipe.imageUrl}
            className="RecipeBanner"
        /> */}

        {/* <Button
            className="RecipeInfo-editImage"
            onClick={() => { setShowModal(true); }}
            startIcon={<FontAwesomeIcon icon={faPencilAlt} />}
            variant="contained"
            color="brightWhite"
        >
            Image
        </Button> */}

        <Box className="RecipeForm">

            <form onSubmit={async (values)=>{
              handleSubmit(values)
            }} >
            <RecipeInfoInput/>
            <StepsInputs/>
            <Box className="Recipe-submitButton">
                <Button
                type='submit'
                variant="contained"
                color="primary"
                >
                <Typography variant="h5">
                    Save Changes
                </Typography>
                </Button>
            </Box>
            </form>
        </Box>
        </>
    );
}

export default RecipeFormDisplay;