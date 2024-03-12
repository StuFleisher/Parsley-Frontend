import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import RecipeInfoInput from "./RecipeInfoInput";
import StepsInputs from "./StepsInputs";
import ErrorDisplay from "../ui/ErrorDisplay";
import "./RecipeFormDisplay.scss";


import { useFormikContext, Form } from "formik";

type props = {
    deleteRecipe: () => Promise<void>;
};

function RecipeFormDisplay({ deleteRecipe }: props) {

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

    const errorMessage = (`
        Please check following fields to continue:
        ${Object.keys(errors).map(key =>{return key!=="steps" ? key : null}).join(", ")}
        ${stepsWithErrors.map((step) => ` Step ${step.stepNumber}`).join(',')}
    `)

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
                            {!isValid && <ErrorDisplay message={errorMessage} />}

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