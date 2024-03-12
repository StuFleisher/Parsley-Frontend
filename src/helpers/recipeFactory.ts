function emptyRecipe(recipe = ({} as SimpleRecipeData)): SimpleRecipeData {
  recipe.name = "";
  recipe.sourceName = "";
  recipe.description = "";
  recipe.imageSm = "";
  recipe.imageMd = "";
  recipe.imageLg = "";
  return recipe;
}

function emptyStep(step = ({} as IStep)): IStep {
  step.stepNumber = 0;
  step.instructions = "";
  step.ingredients = [emptyIngredient()];
  return step;
}

function emptyIngredient(ingredient = ({} as IIngredient)): IIngredient {
  ingredient.amount = "";
  ingredient.description = "";
  ingredient.instructionRef = "";
  return ingredient;
}

const emptyRecipeList = [emptyRecipe(), emptyRecipe(), emptyRecipe()];

export {
  emptyRecipe,
  emptyStep,
  emptyIngredient,
  emptyRecipeList,
};