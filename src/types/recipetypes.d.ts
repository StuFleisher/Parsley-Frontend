
interface IRecipe {
  name:string;
  owner:string;
  description: string;
  sourceName: string;
  steps:IStep[];
}

type Recipe = IRecipe & { //full recipe record from database
  recipeId:number;
  sourceUrl?: string|undefined;
  sourceName: string;
  imageSm?: string;
  imageMd?: string;
  imageLg?: string;
  steps:IStep[] | StepForCreate;
}

type RecipeForCreate = IRecipe & {
  sourceUrl?: string|undefined;
  imageSm?: string;
  imageMd?: string;
  imageLg?: string;
  steps:IStep[] | StepForCreate;
}

type GeneratedRecipe = {
  name: string;
  description:string;
  sourceName:string;
  steps: IStep[];
}


//A less detailed recipe for summary views with no submodel data
type SimpleRecipeData = {
  recipeId:number;
  name:string;
  owner: string;
  description: string;
  sourceUrl: string|undefined;
  sourceName: string;
  imageSm:string;
  imageMd:string;
  imageLg:string;
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