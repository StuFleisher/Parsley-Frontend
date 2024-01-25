import RecipeInfo from "./RecipeInfo";
import StepsList from "./StepsList";
import './RecipeCard.scss';

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const DEFAULT_IMG_URL = "/images/classic-chocolate-chip-cookies.jpg"

type Props = {
  recipe:IRecipe
}

function RecipeCard({recipe}:Props) {

  return (
    <>
    <Box component="img" src={recipe.imageUrl} className="RecipeBanner"/>

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