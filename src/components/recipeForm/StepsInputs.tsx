import StepInput from "./StepInput";
import React, { useCallback } from "react";
import { FieldArray, FieldArrayRenderProps, FormikErrors } from "formik";
import './StepsInputs.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";


type props = {
    steps:(IStep|StepForCreate)[];
    errors:string | string[] | FormikErrors<IStep>[] | undefined;
}

/** Renders StepInput components for every Step passed to props
 *  Handles creation and deletion of steps
 */

const StepsInputs = React.memo(
    function StepsInputs({steps, errors}:props) {

        /** Callback to handle creation of a new step */

        const createEmptyStep = useCallback((index:number, arrayHelpers:FieldArrayRenderProps)=>{
            const emptyStep = {
                stepNumber: index+1,
                instructions: "",
                ingredients: []
            };

            const updatedSteps = [
                ...steps.slice(0, index),
                emptyStep,
                ...steps.slice(index)
              ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

            arrayHelpers.form.setFieldValue('steps',updatedSteps)
        },[steps])


        /** Callback to handle deletion of a step */

        const deleteStep = useCallback((index: number, arrayHelpers:FieldArrayRenderProps)=>{

            const updatedSteps = [
            ...steps.slice(0, index),
            ...steps.slice(index + 1)
            ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

            arrayHelpers.form.setFieldValue('steps',updatedSteps)
          },[steps])



        /** Renders a single StepInput and its controls */

        const renderStep= useCallback((step: IStep, index: number, arrayHelpers: FieldArrayRenderProps)=> {
            return (
                <React.Fragment key={step.stepNumber}>
                    <Box
                        className={
                            errors && errors[index] && Object.keys(errors[index]).length!==0
                            ? "StepInput-error"
                            : "StepInput"
                        }
                    >
                        <StepInput
                            index={index}
                            step={step}
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
        },[createEmptyStep,deleteStep,errors])

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

