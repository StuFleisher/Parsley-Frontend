import * as yup from 'yup';

const recipeFormSchema = yup.object({
  recipeId: yup.number(),
  name: yup.string().required("Name is required").max(200),
  description: yup.string().required("Description is required").max(1000),
  owner: yup.string(),
  sourceName: yup.string().required("Recipe source is required").max(50),
  sourceUrl: yup.string().url(),
  imageUrl: yup.string().url(),
  steps:yup.array().of(
    yup.object({
      stepNumber:yup.number(),
      instructions: yup.string().required("Instructions are required").max(5000),
      stepId:yup.number(),
      ingredients:yup.array().of(
        yup.object({
          ingredientId:yup.number(),
          amount: yup.string().max(500),
          description:yup.string().required("Ingredient name is required").max(500),
          instructionRef:yup.string().max(500),
        })),
    })
  )
})

export default recipeFormSchema