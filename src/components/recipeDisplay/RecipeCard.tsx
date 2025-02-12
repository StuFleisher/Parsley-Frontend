import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import RecipeInfo from "./RecipeInfo";
import StepsList from "./StepsList";
import './RecipeCard.scss';
import ShoppingList from "./ShoppingList";
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import FavoriteButton from "../ui/FavoriteButton";
import EditButton from "../ui/EditButton";
import DeleteButton from "../ui/DeleteButton";
import userContext from "../../helpers/userContext";

type Props = {
  recipe: Recipe,
};

function RecipeCard({ recipe }: Props) {

  const { username } = useContext(userContext);
  let [showShoppingList, setShowShoppingList] = useState(false);

  function toggleShowShoppingList(event: React.MouseEvent): void {
    setShowShoppingList((current) => !current);
  }

  return (
    <>
      <Box component="img" src={recipe.imageLg} className="RecipeBanner" />
      <Box className="RecipeCard">
        <Card className="RecipeCard-RecipeInfo">
          <RecipeInfo recipe={recipe} variant="detailed" />
        </Card>
        <Accordion
          expanded={showShoppingList}
          className="RecipeCard-actions"
          elevation={0}
          disableGutters
        >
          <AccordionSummary>
            <Stack
              direction="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              width='100%'
            >
              <Typography
                variant="caption"
                onClick={toggleShowShoppingList}
              >
                <Typography component="span" variant="body1" mr=".5rem">
                <FontAwesomeIcon icon={faList} />
                </Typography>
                {showShoppingList ? " Hide Full Ingredient List" : " Show Full Ingredient List"}
              </Typography>
              <Box>
              {username &&
                <Stack
                    className="RecipeCard-actionsIconContainer"
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                    sx={{
                        height: { xs: "fit-content", sm: "100%" },
                        width: { xs: "100%", sm: "fit-content" },
                    }}
                >
                    {recipe.owner === username &&
                        <>
                            <EditButton
                            recipe={recipe}
                            />
                            <DeleteButton
                                recipe={recipe}
                            />
                        </>
                    }
                    <FavoriteButton recipe={recipe} />
                </Stack>}
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <ShoppingList recipe={recipe} />
          </AccordionDetails>
        </Accordion>
        <StepsList steps={recipe.steps} />
      </Box>
    </>
  );
}

export default RecipeCard;