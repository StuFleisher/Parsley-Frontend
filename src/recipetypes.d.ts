interface IRecipe {
  name:string;
  description: string;
  sourceUrl: string|undefined;
  sourceName: string;
  recipeId:number;
  steps:IStep[];
}

interface IIngredient {
  ingredientId:number
  amount: string,
  description:string,
}

interface IIngredientList {
  ingredients: IIngredient[]
}

interface IStep {
  stepNumber:number,
  instructions: string
  stepId:number,
  ingredients:IIngredient[]
}