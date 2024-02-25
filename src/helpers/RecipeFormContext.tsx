import {Formik} from "formik";
import recipeFormSchema from "./recipeFormSchema";


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
          validationSchema={recipeFormSchema}
        >
          {children}
        </Formik>
    )
}

export {RecipeFormProvider}