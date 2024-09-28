import React from "react";

import { Formik } from "formik";

import recipeFormSchema from "./recipeFormSchema";
import { stringToTags, tagsToString } from "./utilities";

type props<T> = {
  children: React.ReactNode;
  recipe: T;
  onSubmitCallback: ((formData: T) => Promise<void>);
};

function RecipeFormProvider<T extends IRecipe | Recipe | RecipeForCreate>(
  { recipe, onSubmitCallback, children }: props<T>
) {

  function recipeToFormData(recipe:T){
    return {
      ...recipe,
      tags: recipe.tags ? tagsToString(recipe.tags) : ""
    }
  }

  function formDataToRecipe(values:any):T{
    return {
      ...values,
      tags: stringToTags(values.tags)
    }
  }

  return (

    <Formik
      initialValues={recipeToFormData(recipe)}
      onSubmit={async (values) => await onSubmitCallback(formDataToRecipe(values))}
      validationSchema={recipeFormSchema}
    >
      {children}
    </Formik>
  );
}

export { RecipeFormProvider };