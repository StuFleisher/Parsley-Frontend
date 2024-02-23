import React, { FormEvent, useState, useEffect, useCallback, createContext, useMemo } from "react";
import {Formik} from "formik";

type props = {
    children: any;
    recipe: RecipeForCreate | IRecipe;
    onSubmitCallback: Function;
}

function RecipeFormProvider({recipe, onSubmitCallback, children}:props) {

    return (

        <Formik
          initialValues={recipe}
          onSubmit={async (values)=>await onSubmitCallback(values)}
          validateOnChange={false}
        >
          {children}
        </Formik>
    )
}

export {RecipeFormProvider}