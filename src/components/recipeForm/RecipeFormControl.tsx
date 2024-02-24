
import "./RecipeForm.scss";
import React, { FormEvent, useState, useEffect, useCallback, useMemo, useContext } from "react";

type Props = {
  recipe: RecipeForCreate | IRecipe,
  onSubmitCallback: Function,
  children: any,
};

type tRecipeFormCallbacks = {
    updateRecipeInfo:(recipeInfo: recipeInfo)=>void;
    createStep:(index: number)=>void,
    deleteStep:(index: number)=>void,
    updateInstruction:(stepIndex: number, value: string) =>void,
    updateIngredients:(
      stepIndex: number,
      ingredientIndex: number,
      amount: string,
      description: string)=>void,
    createIngredient:(stepIndex: number) => void,
    deleteIngredient:(stepIndex: number, ingredientIndex: number)=>void,
}

type tRecipeFormData = {
  formData:IRecipe|RecipeForCreate;
  handleSubmit:(evt: FormEvent<HTMLFormElement>)=>Promise<void>;
  errors:Object;
}

const RecipeFormCallbackContext = React.createContext<tRecipeFormCallbacks | null>(null);
function useRecipeFormCallbacks():tRecipeFormCallbacks {
  const context = useContext(RecipeFormCallbackContext);
  if (!context) throw new Error ("useRecipeFormCallbacks must be used inside of a RecipeFormControl Component")
  return context;
};

const RecipeFormDataContext = React.createContext<tRecipeFormData|null>(null);
function useRecipeFormData():tRecipeFormData {
  const context = useContext(RecipeFormDataContext);
  if (!context) throw new Error ("useRecipeData must be used inside of a RecipeFormControl Component")
  return context;
};

// function recipeToFormData(recipe:RecipeForCreate | IRecipe){
//   let convertedRecipe:any = {}
//   for (let key in recipe){
//     convertedRecipe[key]={
//       id:crypto.randomUUID(),
//       name:key,
//       value:recipe[key],
//     }
//   }
// }


/********************************* COMPONENT *********************************************/

function RecipeFormControl({ recipe, onSubmitCallback, children }: Props) {

  const [formData, setFormData] = useState(recipe);
  const [errors, setErrors] = useState({})

  useEffect(function updateFormDataOnRecipeChange() {
    setFormData(recipe);
  }, [recipe]);


  async function handleSubmit(evt: FormEvent<HTMLFormElement>):Promise<void> {
    evt.preventDefault();
    console.log("handling form submission");

    await onSubmitCallback(formData);
    //update image
  }

  /**************************** UPDATE METHODS */

  /** Callback function to update Ingredients field */
  const updateIngredients = useCallback((
    stepIndex: number,
    ingredientIndex: number,
    amount: string,
    description: string):void => {

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
  const updateInstruction = useCallback((stepIndex: number, value: string):void => {

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

      return {
        ...currentFormData,
        steps: updatedSteps,
      };
    });
  },[])

  /** Callback function to update the recipeInfo fields */
  const updateRecipeInfo = useCallback((recipeInfo: recipeInfo):void => {
    setFormData(() => {
      return {
        ...formData,
        ...recipeInfo,
      };
    });
  },[])


  /******************************** Create Methods */

  /** Callback function to update a step and its submodels */
  const createStep=useCallback((index: number):void => {

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
  const createIngredient = useCallback((stepIndex: number):void => {
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

  const deleteStep= useCallback((index: number):void=> {
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

  const deleteIngredient=useCallback((stepIndex: number, ingredientIndex: number):void => {

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

  const RecipeFormCallbacks:tRecipeFormCallbacks = useMemo(()=>({
    updateRecipeInfo,
    createStep,
    deleteStep,
    updateInstruction,
    updateIngredients,
    createIngredient,
    deleteIngredient,
  }),[
    updateRecipeInfo,
    createStep,
    deleteStep,
    updateInstruction,
    updateIngredients,
    createIngredient,
    deleteIngredient,])


  const RecipeFormData = {
    handleSubmit,
    formData,
    errors,
  }

    return (
      <RecipeFormCallbackContext.Provider value={RecipeFormCallbacks}>
        <RecipeFormDataContext.Provider value = {RecipeFormData}>
        {children}
        </RecipeFormDataContext.Provider>
      </RecipeFormCallbackContext.Provider>
    )
}

export {useRecipeFormCallbacks, useRecipeFormData, RecipeFormControl}