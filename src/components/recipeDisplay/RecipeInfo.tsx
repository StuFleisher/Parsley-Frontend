import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import './RecipeInfo.scss';

function RecipeInfo({ recipe }: { recipe: IRecipe | SimpleRecipeData; }) {

    return (
        <Box className="RecipeInfo">
            <Stack
            className="RecipeInfo-nameContainer"
            direction="row"
            alignItems="start"
            justifyContent="space-between"
            flexWrap="nowrap"
            spacing={2}
            >
                <Link to={`/recipes/${recipe.recipeId}`}>
                    <Typography className='RecipeInfo-name' variant="h2">
                        {recipe.name}
                    </Typography>
                </Link>
                <FontAwesomeIcon icon={faBook}/>
            </Stack>
            <Typography className='RecipeInfo-description' variant="body1">
                {recipe.description}
            </Typography>

            {
                recipe.sourceUrl
                    ?
                        <Typography variant="subtitle1" className='RecipeInfo-sourceName'>
                            {"Source: "}
                            <MuiLink href={recipe.sourceUrl}>
                                {recipe.sourceName}
                            </MuiLink>
                        </Typography>
                    :
                        <Typography variant="subtitle1" className='RecipeInfo-sourceName'>
                            Source: {recipe.sourceName}
                        </Typography>
            }
        </Box>
    );
}

export default RecipeInfo;