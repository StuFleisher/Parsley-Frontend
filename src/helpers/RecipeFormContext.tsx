import {Formik} from "formik";
import recipeFormSchema from "./recipeFormSchema";
import React from "react";


type props<T> = {
    children: React.ReactNode;
    recipe: T;
    onSubmitCallback: ((formData: T)=> Promise<void>);
}

function RecipeFormProvider<T extends RecipeForCreate | IRecipe>({recipe, onSubmitCallback, children}:props<T>) {

    return (

        <Formik
          initialValues={recipe}
          onSubmit={async (values)=>await onSubmitCallback(values as T)}
          validationSchema={recipeFormSchema}
        >
          {children}
        </Formik>
    )
}

export {RecipeFormProvider}