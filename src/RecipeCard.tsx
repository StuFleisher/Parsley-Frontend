import RecipeInfo from "./RecipeInfo";
import StepsTable from "./StepsTable";

function RecipeCard({recipe}:{recipe:IRecipe}) {

  return (
    <div>
      <RecipeInfo recipe={recipe}/>
      <StepsTable steps={recipe.steps}/>
    </div>
  );
}

export default RecipeCard;