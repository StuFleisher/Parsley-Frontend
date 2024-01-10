import RecipeInfo from "./RecipeInfo";
import StepsTable from "./StepsList";
import './RecipeCard.scss';

type Props = {
  recipe:IRecipe
}


function RecipeCard({recipe}:Props) {

  return (
    <div className="RecipeCard">
      <RecipeInfo recipe={recipe}/>
      <StepsTable steps={recipe.steps}/>
    </div>
  );
}

export default RecipeCard;