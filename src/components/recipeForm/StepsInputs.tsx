import StepInput from "./StepInput";
import React, { MouseEvent, useCallback } from "react";
import { useFormikContext, FieldArray, FieldArrayRenderProps } from "formik";
import './StepsInputs.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


/** Renders StepInput components for every Step passed to props
 *  Handles creation and deletion of steps
 */

const StepsInputs = React.memo(
    function StepsInputs() {

        const { values, handleChange, handleBlur, errors, touched } = useFormikContext<IRecipe | RecipeForCreate>();
        const steps = values.steps;

        const createEmptyStep = useCallback((index:number, arrayHelpers:FieldArrayRenderProps)=>{
            const emptyStep = {
                stepNumber: index+1,
                instructions: "",
                ingredients: []
            };

            const updatedSteps = [
                ...values.steps.slice(0, index),
                emptyStep,
                ...values.steps.slice(index)
              ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

            arrayHelpers.form.setFieldValue('steps',updatedSteps)
        },[values.steps])

        const deleteStep = useCallback((index: number, arrayHelpers:FieldArrayRenderProps)=>{

            const updatedSteps = [
            ...values.steps.slice(0, index),
            ...values.steps.slice(index + 1)
            ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

            arrayHelpers.form.setFieldValue('steps',updatedSteps)
          },[values.steps])

        const renderStep= useCallback((step: IStep, index: number, arrayHelpers: FieldArrayRenderProps)=> {
            return (
                <React.Fragment key={step.stepNumber}>
                    <Box className="StepInput">
                        <StepInput
                            index={index}
                        />
                        <Box
                            className="StepInput-delete"
                            component="button"
                            data-index={index}
                            type="button"
                            onClick={()=>deleteStep(index, arrayHelpers)}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </Box>
                    </Box>
                    <Stack direction="row">
                        <Button
                            className="Step-create"
                            onClick={()=>createEmptyStep(index + 1, arrayHelpers)}
                            data-index={index}
                            variant="outlined"
                            type="button"
                            startIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                        >
                            New Step
                        </Button>
                    </Stack>
                </React.Fragment>
            );
        },[createEmptyStep,deleteStep])

        return (
            <Box className="StepList">
                <FieldArray
                    name="steps"
                    render={(arrayHelpers) => (
                        steps.map((step, i) => {
                            return (
                                renderStep(step, i, arrayHelpers)
                            );
                        })
                    )}
                />
            </Box>
        );
    });

export default StepsInputs

