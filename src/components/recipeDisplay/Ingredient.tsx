import './Ingredient.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import { Typography } from '@mui/material';

type props = {
    ingredient: IIngredient;
    color: String | undefined;
}

function Ingredient({ingredient, color}:props) {
    const {amount, description} = ingredient;

    return (
        <Stack
            direction="row"
            spacing={1}
            className='Ingredient'
            alignItems='start'
        >
                <FontAwesomeIcon icon={faCheck}/>
                <Box className={`color-${color}`}>
                    <Typography className="Ingredient-text">{amount} {description}</Typography>
                </Box>
        </Stack>
    )
}

export default Ingredient;