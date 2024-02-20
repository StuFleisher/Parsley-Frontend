interface IRecipe { //full recipe record from database
  recipeId:number;
  name:string;
  description: string;
  owner:string;
  sourceUrl?: string|undefined;
  sourceName: string;
  imageUrl?: string;
  steps:IStep[];
}

type GeneratedRecipe = {
  name: string;
  steps: IStep[];
}

type RecipeForCreate = {
  name:string;
  owner: string;
  description: string;
  sourceUrl?: string|undefined;
  sourceName: string;
  imageUrl?: string;
  steps:IStep[];
}

//A less detailed recipe for summary views with no submodel data
type SimpleRecipeData = {
  recipeId:number;
  name:string;
  owner: string;
  description: string;
  sourceUrl: string|undefined;
  sourceName: string;
  imageUrl:string;
}

interface IIngredient {
  amount: string;
  description:string;
  instructionRef:string;
}

type IngredientForCreate = IIngredient
type Ingredient= IIngredient & {
  ingredientId:number;
}

interface IIngredientList {
  ingredients: IIngredient[]
}

interface IStep {
  stepNumber:number;
  instructions: string;
  stepId?:number;
  ingredients:IIngredient[];
}

type StepForCreate = {
  stepNumber:number;
  instructions: string;
  ingredients:IngredientForCreate[];
}

//form error types

type IngredientError = {
  amount: string|null;
  description: string|null;
}

type StepError = {
  instructions:string|null;
  ingredients:ingredientError[];
}

type RecipeError = {
  name:string|null,
  description: string|null;
  sourceUrl: string|null;
  sourceName: string|null;
  steps:stepError[];
}