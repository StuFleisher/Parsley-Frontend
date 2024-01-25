interface IRecipe {
  name:string;
  description: string;
  sourceUrl?: string|undefined;
  sourceName: string;
  imageUrl?: string;
  recipeId?:number;
  steps:IStep[];
}

//A less detailed recipe for summary views with no submodel data
type SimpleRecipeData = {
  recipeId:number;
  name:string;
  description: string;
  sourceUrl: string|undefined;
  sourceName: string;
  imageUrl:string;
}

interface IIngredient {
  ingredientId?:number
  amount: string,
  description:string,
  instructionRef:string,
}

interface IIngredientList {
  ingredients: IIngredient[]
}

interface IStep {
  stepNumber:number,
  instructions: string
  stepId?:number,
  ingredients:IIngredient[]
}

