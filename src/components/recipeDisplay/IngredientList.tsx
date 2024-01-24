import Ingredient from "./Ingredient";
import './IngredientList.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";
import parsleyTheme from "../../styles/theme";

type props = {
    ingredients:IIngredient[];
    colorMap:Map<IIngredient, string>
}

function IngredientList({ ingredients, colorMap }: props) {

    const emptyIngredientDisplay = useMediaQuery(parsleyTheme.breakpoints.up("md"))
    ?
        <Box className="Ingredient-empty" >
                <FontAwesomeIcon icon={faKitchenSet} />
        </Box>
    :
        <></>
    if (ingredients.length===0){return (emptyIngredientDisplay)}

    return (
        <Stack spacing={1}>
            {ingredients.map((ingredient,idx)=>{
                return (
                <div key={idx}>
                    <Ingredient
                        color={colorMap.get(ingredient)}
                        ingredient={ingredient}
                    />
                </div>)
            })}
        </Stack>
    )
}

export default IngredientList;