import { List, ListItem } from "@mui/material";

type ShoppingListProps = {
  recipe: Recipe;
};

function ShoppingList({ recipe }: ShoppingListProps) {

  const ingredients: IIngredient[] = recipe.steps.reduce(
    (acc: IIngredient[], step: IStep) => ([...acc, ...step.ingredients]),
    []
  );

  return (
    <List
      sx={{ columnCount: { xd: 1, sm: 2, md: 3 } }}
    >
      {ingredients.map((ingredient, index) => (
        <ListItem key={`${ingredient.instructionRef} ${index}`}>{`${ingredient.amount} ${ingredient.instructionRef}`}</ListItem>
      ))
      }
    </List>
  );

}

export default ShoppingList;