import RecipeInfo from "./RecipeInfo";
import StepsList from "./StepsList";
import './RecipeCard.scss';

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const DEFAULT_IMG_URL = "/images/chicken_curry.jpg"

type Props = {
  recipe:IRecipe
}

function RecipeCard({recipe}:Props) {

  return (
    <>
    <Box component="img" src={DEFAULT_IMG_URL} className="RecipeBanner"/>

    <Box className="RecipeCard">
      <Card className="SimpleRecipeCard">
        <RecipeInfo recipe={recipe}/>
      </Card>
      <StepsList steps={recipe.steps}/>
    </Box>
    </>
  );
}

export default RecipeCard;