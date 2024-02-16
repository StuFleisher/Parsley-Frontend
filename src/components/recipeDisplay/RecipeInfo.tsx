import { useCookbook } from '../../helpers/cookbookContext';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import './RecipeInfo.scss';

type props = {
    recipe: IRecipe | SimpleRecipeData;
};

function RecipeInfo({ recipe }: props) {

    const {isInCookbook, toggleInCookbook} = useCookbook()

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
                    <Typography className='RecipeInfo-name' variant="h1">
                        {recipe.name}
                    </Typography>
                </Link>
                <IconButton
                    onClick={()=>toggleInCookbook(recipe)}
                >
                    <FontAwesomeIcon
                        icon={isInCookbook(recipe) ? faBookBookmark : faBook }
                        className={
                            isInCookbook(recipe) ? "CookbookIcon-remove" : "CookbookIcon-add"
                        }
                    />
                </IconButton>
            </Stack>
            <Typography className='RecipeInfo-owner' variant="subtitle1">
                {"Submitted by "}
                <Link to={`/users/${recipe.owner}`}>{recipe.owner}</Link>
            </Typography>
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