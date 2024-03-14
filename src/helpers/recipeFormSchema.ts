import * as yup from 'yup';

const recipeFormSchema = yup.object({
  recipeId: yup.number(),
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  owner: yup.string(),
  sourceName: yup.string().required("Recipe source is required"),
  sourceUrl: yup.string().url(),
  imageUrl: yup.string().url(),
  steps:yup.array().of(
    yup.object({
      stepNumber:yup.number(),
      instructions: yup.string().required("Instructions are required"),
      stepId:yup.number(),
      ingredients:yup.array().of(
        yup.object({
          ingredientId:yup.number(),
          amount: yup.string(),
          description:yup.string().required("Ingredient name is required"),
          instructionRef:yup.string(),
        })),
    })
  )
})

export default recipeFormSchema