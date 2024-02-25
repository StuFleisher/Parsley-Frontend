
import RecipeInfoInput from "./RecipeInfoInput";
import StepsInputs from "./StepsInputs";

import { Box, Button, Typography } from "@mui/material";


import { useFormikContext, Form } from "formik";



function RecipeFormDisplay() {

    const { values, isValid, errors } = useFormikContext();

    function logErrors(){
            console.log(errors);
            return(
            <Typography variant="h5">
                "Please fix all form errors to continue"
            </Typography>)
    }

    return (
        <>
            <Box className="RecipeForm">
                <Form>
                    <RecipeInfoInput />
                    <StepsInputs steps={(values as IRecipe).steps} />
                    <Box className="Recipe-submitButton">
                        {isValid
                        ?
                            <Button
                                type='submit'
                                variant="contained"
                                color="primary"
                            >
                                <Typography variant="h5">
                                    Save Changes
                                </Typography>
                            </Button>
                        :
                                logErrors()
                        }
                    </Box>
                </Form>
            </Box>
        </>
    );
}

export default RecipeFormDisplay;