import RecipeInfo from "./RecipeInfo";
import StepsList from "./StepsList";
import './RecipeCard.scss';

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

type Props = {
  recipe:Recipe,
}

function RecipeCard({recipe}:Props) {

  return (
    <>
    <Box component="img" src={recipe.imageLg} className="RecipeBanner"/>
    <Box className="RecipeCard">
      <Card className="RecipeCard-RecipeInfo">
        <RecipeInfo recipe={recipe} showActions={true}/>
      </Card>
      <StepsList steps={recipe.steps}/>
    </Box>
    </>
  );
}

export default RecipeCard;