import RecipeInfoInput from "./RecipeInfoInput";
import StepsInputs from "./StepsInputs";
import ImageForm from "../ui/ImageForm";

import "./RecipeForm.scss";
import { FormEvent, useState, useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { Box, Button, Modal, Typography } from "@mui/material";

type recipeInfo = {
  name: string;
  description: string;
  sourceUrl?: string;
  sourceName: string;
};

type Props = {
  recipe: RecipeForCreate | IRecipe,
  onSubmitCallback: Function,
};

const emptyError:RecipeError = {
  name: null,
  description: null,
  sourceName:null,
  sourceUrl:null,
  steps:[],
}

/********************************* COMPONENT *********************************************/

function RecipeForm({ recipe, onSubmitCallback }: Props) {

  const [formData, setFormData] = useState(recipe);
  const [formErrors, setFormErrors] = useState<RecipeError>(emptyError)

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<Blob | undefined>();

  useEffect(function updateFormDataOnRecipeChange() {
    setFormData(recipe);
  }, [recipe]);


  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log("handling form submission");
    console.log("image in RecipeForm component:", image);
    await onSubmitCallback(formData, image);
    //update image
  }

  /**************************** UPDATE METHODS */

  /** Callback function to update Ingredients field */
  const updateIngredients = useCallback((
    stepIndex: number,
    ingredientIndex: number,
    amount: string,
    description: string) => {

    setFormData((currentFormData) => {

      const updatedIngredients = currentFormData.steps[stepIndex].ingredients.map(
        (ingredient, i) => {
          if (ingredientIndex === i) {
            return {
              ...ingredient,
              amount,
              description,
            };
          }
          return ingredient;
        }
      );

      const updatedSteps = currentFormData.steps.map((step, i) => {
        if (i === stepIndex) {
          return {
            ...step,
            ingredients: updatedIngredients,
          };
        }
        return step;
      });

      return {
        ...currentFormData,
        steps: updatedSteps,
      };

    });
  },[])

  /** Callback function to update the instruction fields */
  const updateInstruction = useCallback((stepIndex: number, value: string) => {

    setFormData((currentFormData) => {
      const updatedSteps = currentFormData.steps.map((step, i) => {
        if (i === stepIndex) {
          return {
            ...currentFormData.steps[i],
            instructions: value,
          };
        }
        return step;
      });
      console.log("updated steps", updatedSteps);

      return {
        ...currentFormData,
        steps: updatedSteps,
      };
    });
  },[])

  /** Callback function to update the recipeInfo fields */
  const updateRecipeInfo = useCallback((recipeInfo: recipeInfo) => {
    setFormData(() => {
      return {
        ...formData,
        ...recipeInfo,
      };
    });
  },[])

  /** Callback function to store an image in state*/
  const updateRecipeImage= useCallback((file: Blob) => {
    closeModal();
    setImage(file);
  },[])



  /******************************** Create Methods */

  /** Callback function to update a step and its submodels */
  const createStep=useCallback((index: number) => {

    setFormData((currentFormData) => {
      const emptyStep: IStep = {
        stepNumber: index,
        instructions: "",
        ingredients: []
      };

      const updatedSteps = [
        ...currentFormData.steps.slice(0, index),
        emptyStep,
        ...currentFormData.steps.slice(index)
      ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

      return {
        ...currentFormData,
        steps: updatedSteps,
      };
    });
  },[])

  /** Callback function to update an ingredient */
  const createIngredient = useCallback((stepIndex: number) => {
    const emptyIngredient: IIngredient = {
      amount: "",
      description: "",
      instructionRef: "",
    };

    setFormData((currentFormData) => {

      //insert an empty ingredient
      const updatedIngredients = [
        ...currentFormData.steps[stepIndex].ingredients,
        emptyIngredient,
      ];

      //replace the affected step
      const updatedSteps = currentFormData.steps.map((step, i) => {
        if (stepIndex === i) {
          return {
            ...step,
            ingredients: updatedIngredients,
          };
        }
        return step;
      });

      //update the form data
      return {
        ...currentFormData,
        steps: updatedSteps,
      };
    });
  },[])



  /************************** Delete Methods  */

  const deleteStep= useCallback((index: number)=> {
    setFormData((currentFormData) => {
      console.log("removing at", index);
      const updatedSteps = [
        ...currentFormData.steps.slice(0, index),
        ...currentFormData.steps.slice(index + 1)
      ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

      return {
        ...currentFormData,
        steps: updatedSteps,
      };
    });
  },[])

  const deleteIngredient=useCallback((stepIndex: number, ingredientIndex: number) => {

    setFormData((currentFormData) => {
      //remove the ingredient
      const updatedIngredients = [
        ...currentFormData.steps[stepIndex].ingredients.slice(0, ingredientIndex),
        ...currentFormData.steps[stepIndex].ingredients.slice(ingredientIndex + 1),
      ];

      //replace the affected step
      const updatedSteps = currentFormData.steps.map((step, i) => {
        if (stepIndex === i) {
          return {
            ...step,
            ingredients: updatedIngredients,
          };
        }
        return step;
      });

      //update the form data
      return {
        ...currentFormData,
        steps: updatedSteps,
      };
    });
  },[])

  /************************** UI Methods  */

  function closeModal(){
    setShowModal(false)
  }

  /************************************ JSX ************************************ */

  return (
    <>
      <Modal
        open={showModal}
        onClose={closeModal}
      >
        <Box className="EditImageModal">
          <ImageForm
            imgUrl=""
            onSubmit={updateRecipeImage}
          />
        </Box>
      </Modal>

      <Box component="img"
        src={image ? URL.createObjectURL(image) : recipe.imageUrl}
        className="RecipeBanner"
      />

      <Button
        className="RecipeInfo-editImage"
        onClick={() => { setShowModal(true); }}
        startIcon={<FontAwesomeIcon icon={faPencilAlt} />}
        variant="contained"
        color="brightWhite"
      >
        Image
      </Button>
      <Box className="RecipeForm">

        <form onSubmit={handleSubmit} >
          <RecipeInfoInput
            recipe={formData}
            updateRecipeInfo={updateRecipeInfo}
            updateRecipeImage={updateRecipeImage}
          />
          <StepsInputs
            initialSteps={formData.steps}
            updateInstruction={updateInstruction}
            updateIngredients={updateIngredients}
            deleteIngredient={deleteIngredient}
            createIngredient={createIngredient}
            createStep={createStep}
            deleteStep={deleteStep}
          />
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

export default RecipeForm;