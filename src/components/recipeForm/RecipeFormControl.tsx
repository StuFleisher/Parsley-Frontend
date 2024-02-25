
import "./RecipeForm.scss";
import React, { FormEvent, useState, useEffect, useCallback, useMemo, useContext } from "react";

type Props = {
  recipe: RecipeForCreate | IRecipe,
  onSubmitCallback: Function,
  children: any,
};

type tRecipeFormCallbacks = {
  updateRecipeInfo: (recipeInfo: recipeInfo) => void;
  createStep: (index: number) => void,
  deleteStep: (index: number) => void,
  updateInstruction: (stepIndex: number, value: string) => void,
  updateIngredients: (
    stepIndex: number,
    ingredientIndex: number,
    amount: string,
    description: string) => void,
  createIngredient: (stepIndex: number) => void,
  deleteIngredient: (stepIndex: number, ingredientIndex: number) => void,
};

type tRecipeFormData = {
  formData: RecipeFormData;
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => Promise<void>;
  errors: Object;
};

const RecipeFormCallbackContext = React.createContext<tRecipeFormCallbacks | null>(null);
function useRecipeFormCallbacks(): tRecipeFormCallbacks {
  const context = useContext(RecipeFormCallbackContext);
  if (!context) throw new Error("useRecipeFormCallbacks must be used inside of a RecipeFormControl Component");
  return context;
};

const RecipeFormDataContext = React.createContext<tRecipeFormData | null>(null);
function useRecipeFormData(): tRecipeFormData {
  const context = useContext(RecipeFormDataContext);
  if (!context) throw new Error("useRecipeData must be used inside of a RecipeFormControl Component");
  return context;
};

const uuidMap = new Map<string, string>();
function getOrGenerateUUID(key:string){
  if (!uuidMap.has(key)){
    const newUuid = crypto.randomUUID();
    uuidMap.set(key,newUuid);
  }
  return uuidMap.get(key)!;
}

function convertToInputField<T extends object>(object: T): { [K in keyof T]: InputField<T[K]> | Array<any> } {
  let convertedObject: Partial<{ [K in keyof T]?: InputField<T[K]> | Array<any>}> = {};

  (Object.keys(object) as Array<keyof T>).forEach(key => {
    const value = object[key];
    if (Array.isArray(value)) {
      convertedObject[key]=[];
    } else {
      convertedObject[key] = {
        fieldId: getOrGenerateUUID(String(key)),//FIXME: keys are not unique
        name: String(key),
        value: value,
      };
    }
  });

  return convertedObject as { [K in keyof T]: InputField<T[K]> | Array<any> };
}

/** Converts recipe data into a useable shape for formData by replacing simple values with
 * objects containing fieldIds for each property within the recipe
 */
function recipeToFormData(recipe: RecipeForCreate | IRecipe): RecipeFormData {

  const convertedSteps:StepFormData[] = (
    recipe.steps.map((step) => {
      const convertedStep = convertToInputField(step);
      const convertedIngredients:IngredientFormData[] = (
        step.ingredients.map((ingred) => {
          const convertedIngred=convertToInputField(ingred)
          return convertedIngred;
        })
      );
      convertedStep.ingredients = convertedIngredients;
      return convertedStep as StepFormData;
    })
  );

  let convertedRecipe = convertToInputField(recipe);
  convertedRecipe.steps = convertedSteps;
  return convertedRecipe as RecipeFormData;
}

/** Converts form data back into a simplified recipe type by removing form specific properties */
function formDataToRecipe(formData: RecipeFormData): (RecipeForCreate | IRecipe) {

  function convertIngred(ingred: IngredientFormData) {
    let convertedIngred: any = {};
    for (const key in ingred) {
      (convertedIngred as any)[key] = (ingred as any)[key].value;
    }
    return convertedIngred;
  }

  function convertStep(step: StepFormData) {
    let convertedStep: any = {};
    for (const key in step) {
      (convertedStep as any)[key] = (step as any)[key].value;
      convertedStep.ingredients = step.ingredients.map(
        (ingred) => convertIngred(ingred)
      );
    }
    return convertedStep;
  }

  let convertedRecipe: any = {};
  for (const key in formData) {
    (convertedRecipe as any)[key] = (formData as any)[key].value;
    convertedRecipe.steps = formData.steps.map(
      (step) => convertStep(step)
    );
  }

  return convertedRecipe;
}


/********************************* COMPONENT *********************************************/

function RecipeFormControl({ recipe, onSubmitCallback, children }: Props) {

  const [formData, setFormData] = useState(recipeToFormData(recipe));
  const [errors, setErrors] = useState({});

  useEffect(function updateFormDataOnRecipeChange() {
    let newRecipe = recipeToFormData(recipe);
    setFormData(newRecipe);
  }, [recipe]);


  async function handleSubmit(evt: FormEvent<HTMLFormElement>): Promise<void> {
    evt.preventDefault();
    console.log("handling form submission");
    const updatedRecipe = formDataToRecipe(formData)
    await onSubmitCallback(updatedRecipe);
  }

  /**************************** UPDATE METHODS */

  /** Callback function to update Ingredients field */
  const updateIngredients = useCallback((
    stepIndex: number,
    ingredientIndex: number,
    amount: string,
    description: string
  ): void => {

    setFormData((currentFormData) => {
      const updatedIngredients = currentFormData.steps[stepIndex].ingredients.map(
        (ingredient, i) => {
          if (ingredientIndex === i) {
            // return ingredientToInsert;
            return {
              ...ingredient,
              amount:{...ingredient.amount, value:amount},
              description:{...ingredient.description, value:description},
            }
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
  }, []);

  /** Callback function to update the instruction fields */
  const updateInstruction = useCallback((stepIndex: number, value: string): void => {

    // setFormData((currentFormData) => {
    //   const updatedSteps = currentFormData.steps.map((step, i) => {
    //     if (i === stepIndex) {
    //       return {
    //         ...currentFormData.steps[i],
    //         instructions: value,
    //       };
    //     }
    //     return step;
    //   });

    //   return {
    //     ...currentFormData,
    //     steps: updatedSteps,
    //   };
    // });
  }, []);

  /** Callback function to update the recipeInfo fields */
  const updateRecipeInfo = useCallback((recipeInfo: recipeInfo): void => {
    // setFormData(() => {
    //   return {
    //     ...formData,
    //     ...recipeInfo,
    //   };
    // });
  }, []);


  /******************************** Create Methods */

  /** Callback function to update a step and its submodels */
  const createStep = useCallback((index: number): void => {

    // setFormData((currentFormData) => {
    //   const emptyStep: IStep = {
    //     stepNumber: index,
    //     instructions: "",
    //     ingredients: []
    //   };

    //   const updatedSteps = [
    //     ...currentFormData.steps.slice(0, index),
    //     emptyStep,
    //     ...currentFormData.steps.slice(index)
    //   ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

    //   return {
    //     ...currentFormData,
    //     steps: updatedSteps,
    //   };
    // });
  }, []);

  /** Callback function to update an ingredient */
  const createIngredient = useCallback((stepIndex: number): void => {
    // const emptyIngredient: IIngredient = {
    //   amount: "",
    //   description: "",
    //   instructionRef: "",
    // };

    // setFormData((currentFormData) => {

    //   //insert an empty ingredient
    //   const updatedIngredients = [
    //     ...currentFormData.steps[stepIndex].ingredients,
    //     emptyIngredient,
    //   ];

    //   //replace the affected step
    //   const updatedSteps = currentFormData.steps.map((step, i) => {
    //     if (stepIndex === i) {
    //       return {
    //         ...step,
    //         ingredients: updatedIngredients,
    //       };
    //     }
    //     return step;
    //   });

    //   //update the form data
    //   return {
    //     ...currentFormData,
    //     steps: updatedSteps,
    //   };
    // });
  }, []);



  /************************** Delete Methods  */

  const deleteStep = useCallback((index: number): void => {
    // setFormData((currentFormData) => {
    //   console.log("removing at", index);
    //   const updatedSteps = [
    //     ...currentFormData.steps.slice(0, index),
    //     ...currentFormData.steps.slice(index + 1)
    //   ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

    //   return {
    //     ...currentFormData,
    //     steps: updatedSteps,
    //   };
    // });
  }, []);

  const deleteIngredient = useCallback((stepIndex: number, ingredientIndex: number): void => {

    // setFormData((currentFormData) => {
    //   //remove the ingredient
    //   const updatedIngredients = [
    //     ...currentFormData.steps[stepIndex].ingredients.slice(0, ingredientIndex),
    //     ...currentFormData.steps[stepIndex].ingredients.slice(ingredientIndex + 1),
    //   ];

    //   //replace the affected step
    //   const updatedSteps = currentFormData.steps.map((step, i) => {
    //     if (stepIndex === i) {
    //       return {
    //         ...step,
    //         ingredients: updatedIngredients,
    //       };
    //     }
    //     return step;
    //   });

    //   //update the form data
    //   return {
    //     ...currentFormData,
    //     steps: updatedSteps,
    //   };
    // });
  }, []);

  const RecipeFormCallbacks: tRecipeFormCallbacks = useMemo(() => ({
    updateRecipeInfo,
    createStep,
    deleteStep,
    updateInstruction,
    updateIngredients,
    createIngredient,
    deleteIngredient,
  }), [
    updateRecipeInfo,
    createStep,
    deleteStep,
    updateInstruction,
    updateIngredients,
    createIngredient,
    deleteIngredient,]);


  const RecipeFormData = {
    handleSubmit,
    formData,
    errors,
  };

  return (
    <RecipeFormCallbackContext.Provider value={RecipeFormCallbacks}>
      <RecipeFormDataContext.Provider value={RecipeFormData}>
        {children}
      </RecipeFormDataContext.Provider>
    </RecipeFormCallbackContext.Provider>
  );
}

export { useRecipeFormCallbacks, useRecipeFormData, RecipeFormControl };