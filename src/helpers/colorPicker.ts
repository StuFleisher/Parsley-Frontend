

type IngredientColorMap = {
  listRef: String;
  instructionRef: String;
  color: String;
};

const COLORS = ["mint", "peach", "gold", "olive", "salmon","tangerine"];


/** Generator that returns the next color in the COLORS array */
function* nextColorGenerator(n: number) {
  while (true) {
    yield COLORS[n %COLORS.length];
    console.log("generating next color")
    n++;
  }
}
const getNextColor = nextColorGenerator(1);


/** Accepts a list of ingredients and generates a mapping of unique
 * instructionRefs and color names.
*
* @param ingredients:IIngredient[]
*     [{
  *       ingredientId?:number
  *       amount: string,
  *       description:string,
  *       instructionRef:string,
  *     }, ...]
  */

 function mapInstructionRefsToColors(ingredients: IIngredient[]) {
  const getColor = nextColorGenerator(1);

  const instructionRefsToColors = new Map();
  for (let ingredient of ingredients) {
    if (!instructionRefsToColors.get(ingredient.instructionRef)) {
      instructionRefsToColors.set(
        ingredient.instructionRef,
        getColor.next().value);
    }
  }
  return instructionRefsToColors;
}


/** Accepts a list of ingredients and generates a mapping of ingredients to
 * colors.  Colors are grouped by ingredient.instructionRef property.
 */

function mapIngredientsToColors(
  ingredients: IIngredient[],
  refMap: Map<string, string> = mapInstructionRefsToColors(ingredients)
) {
  const ingredientsToColors = new Map();
  for (const ingredient of ingredients) {
    ingredientsToColors.set(ingredient, refMap.get(ingredient.instructionRef));
  }
  return ingredientsToColors;
}

/** Accepts a list of ingredients and generates color mappings.
 * Returns an object containing 2 maps:
 * {
 *  instructionsColors --> maps each unique instructionRefs to a color
 *  ingredientsColors --> maps each ingredient to a color based on the
 *    instructionRef for that ingredient.
 * }
 *
 */

function getIngredientColorMaps(ingredients: IIngredient[]) {
  const instructionsColors = mapInstructionRefsToColors(ingredients);
  console.log ("instructionsColors", instructionsColors);
  const ingredientsColors = mapIngredientsToColors(ingredients,instructionsColors)
  console.log ("ingredientsColors", ingredientsColors)
  return { instructionsColors, ingredientsColors };
}


export { getIngredientColorMaps };