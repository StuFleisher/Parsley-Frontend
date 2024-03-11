
import RecipeInfoInput from "./RecipeInfoInput";
import StepsInputs from "./StepsInputs";

import { Stack, Box, Button, Typography, Alert, Slide } from "@mui/material";
import "./RecipeFormDisplay.scss";


import { useFormikContext, Form } from "formik";

type props = {
    deleteRecipe:()=>Promise<void>
}

function RecipeFormDisplay({deleteRecipe}:props) {

    const { values, isValid, errors } = useFormikContext<Recipe | RecipeForCreate>();

    //A flat array of each step with any errors in its fields
    const stepsWithErrors: (IStep | StepForCreate)[] = function () {
        if (!errors.steps || errors.steps.length === 0) {
            return [];
        } else {
            return values.steps.filter((_, index) => (
                errors.steps![index] && Object.keys(errors.steps![index]).length > 0
            ));
        }
    }();

    console.log(stepsWithErrors);

    function errorMessage() {
        return (
            <Box >
                <Alert severity="error">
                    {`Please check following fields to continue: `}
                    {Object.keys(errors).map(key => key).join(", ")}
                    {stepsWithErrors.map((step) => ` Step ${step.stepNumber}`).join(',')}
                </Alert>
            </Box>
        );
    }

    return (
        <>
            <Box className="RecipeForm">
                <Form>
                    <RecipeInfoInput />
                    <StepsInputs steps={(values as Recipe).steps} errors={errors.steps} />
                    <Button
                        color="primary"
                        onClick={async (e) => {
                            e.preventDefault();
                            deleteRecipe();
                        }}
                    >
                        Delete Recipe
                    </Button>
                    <Box className="Recipe-submitButton">
                        <Stack direction="row" alignContent="center" spacing={2}>
                            <Slide direction="up" in={!isValid}>
                                {errorMessage()}
                            </Slide>

                            <Button
                                type='submit'
                                variant="contained"
                                color="primary"
                                disabled={isValid ? false : true}
                            >
                                <Typography variant="h5">
                                    Save Changes
                                </Typography>
                            </Button>
                        </Stack>

                    </Box>
                </Form>
            </Box>
        </>
    );
}

export default RecipeFormDisplay;