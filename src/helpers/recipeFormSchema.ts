import * as yup from 'yup';

const recipeFormSchema = yup.object({
  recipeId: yup.number(),
  name: yup.string().required(),
  description: yup.string().required(),
  owner: yup.string(),
  sourceName: yup.string().required(),
  sourceUrl: yup.string().url(),
  imageUrl: yup.string().url(),
  steps:yup.array().of(
    yup.object({
      stepNumber:yup.number(),
      instructions: yup.string().required(),
      stepId:yup.number(),
      ingredients:yup.array().of(
        yup.object({
          ingredientId:yup.number(),
          amount: yup.string(),
          description:yup.string().required(),
          instructionRef:yup.string(),
        })),
    })
  )
})

export default recipeFormSchema