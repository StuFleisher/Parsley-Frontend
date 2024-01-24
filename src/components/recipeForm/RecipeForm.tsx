import RecipeInfoInput from "./RecipeInfoInput";
import StepsInputs from "./StepsInputs";
import "./RecipeForm.scss";
import { FormEvent, useState, useEffect } from "react";

type recipeInfo = {
  name: string;
  description: string;
  sourceUrl?: string;
  sourceName: string;
}

type Props = {
  recipe:IRecipe,
  onSubmitCallback:Function,
}

function RecipeForm({recipe, onSubmitCallback}:Props) {

  const [formData,setFormData] = useState(recipe);

  useEffect(function updateFormDataOnRecipeChange(){
    setFormData(recipe);
  },[recipe])

  function handleSubmit(evt:FormEvent<HTMLFormElement>){
    evt.preventDefault();
    onSubmitCallback(formData);
  }

  /**************************** UPDATE METHODS ************************************************/

  /** Callback function to update Ingredients field */
  function updateIngredients(
    stepIndex:number,
    ingredientIndex:number,
    amount:string,
    description:string){

    setFormData((currentFormData)=>{
      const updatedIngredients = currentFormData.steps[stepIndex].ingredients.map(
        (ingredient, i )=>{
          if (ingredientIndex === i){
            return {
              ...ingredient,
              amount,
              description,
            }
          }
          return ingredient;
        }
      )

      const updatedSteps = currentFormData.steps.map((step,i)=>{
        if (i===stepIndex){
          return {
            ...step,
            ingredients: updatedIngredients,
          }
        }
        return step;
      })

      return {
        ...currentFormData,
        steps: updatedSteps,
      }

    })
  }

  /** Callback function to update the instruction fields */
  function updateInstruction(stepIndex:number, value:string){

    setFormData((currentFormData)=>{
      const updatedSteps = currentFormData.steps.map((step, i)=>{
        if (i===stepIndex){
          return {
            ...currentFormData.steps[i],
            instructions:value,
          }
        }
        return step;
      });

      return {
        ...currentFormData,
        steps:updatedSteps,
      }
    })
  }

  /** Callback function to update the recipeInfo fields */
  function updateRecipeInfo(recipeInfo:recipeInfo){
    setFormData(()=>{
      return {
        ...formData,
        ...recipeInfo,
      }
    })
  }

  /******************************** Create Methods **************************************/



  /** Callback function to update a step and its submodels */
  function createStep(index:number){

    setFormData((currentFormData)=>{
      const emptyStep:IStep = {
        stepNumber:index,
        instructions:"",
        ingredients:[]
      }

      const updatedSteps = [
        ...currentFormData.steps.slice(0, index),
        emptyStep,
        ...currentFormData.steps.slice(index)
      ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

      return {
        ...currentFormData,
        steps:updatedSteps,
      }
    })
  }

  /** Callback function to update an ingredient */
  function createIngredient(stepIndex:number){
    const emptyIngredient:IIngredient = {
      amount:"",
      description:"",
      instructionRef:"",
    }

    setFormData((currentFormData)=>{

      //insert an empty ingredient
      const updatedIngredients = [
        ...currentFormData.steps[stepIndex].ingredients,
        emptyIngredient,
      ]

      //replace the affected step
      const updatedSteps = currentFormData.steps.map((step, i) => {
        if (stepIndex===i){
          return {
            ...step,
            ingredients:updatedIngredients,
          }
        }
        return step;
      })

      //update the form data
      return {
          ...currentFormData,
          steps:updatedSteps,
      }
    })
  }

/************************** Delete Methods **************************** */

  function deleteStep(index:number){
    setFormData((currentFormData)=>{

      const updatedSteps = [
        ...currentFormData.steps.slice(0, index),
        ...currentFormData.steps.slice(index+1)
      ].map((step, i) => ({ ...step, stepNumber: i + 1 }));

      return {
        ...currentFormData,
        steps:updatedSteps,
      }
    })
  }

  function deleteIngredient(stepIndex:number, ingredientIndex:number){

    setFormData((currentFormData)=>{

      //remove the ingredient
      const updatedIngredients = [
        ...currentFormData.steps[stepIndex].ingredients.slice(0,ingredientIndex),
        ...currentFormData.steps[stepIndex].ingredients.slice(ingredientIndex+1),
      ]

      //replace the affected step
      const updatedSteps = currentFormData.steps.map((step, i) => {
        if (stepIndex===i){
          return {
            ...step,
            ingredients:updatedIngredients,
          }
        }
        return step;
      })

      //update the form data
      return {
          ...currentFormData,
          steps:updatedSteps,
      }
    })
  }

/************************************************************************ */

  return (
    <div className="RecipeForm">
      <form onSubmit={handleSubmit}>
        <RecipeInfoInput
          recipe={formData}
          updateRecipeInfo={updateRecipeInfo}
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
        <input type='submit' />
      </form>
    </div>
  );
}

export default RecipeForm;