import { useCookbook } from '../../helpers/cookbookContext';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import './RecipeInfo.scss';

type props = {
    recipe: Recipe | SimpleRecipeData;
    showActions?: boolean;
};

function RecipeInfo({ recipe, showActions = false }: props) {

    const { isInCookbook, toggleInCookbook } = useCookbook();

    return (
        <>
            <Stack
                className="RecipeInfo-nameContainer"
                direction="row"
                alignItems="start"
                justifyContent="space-between"
                flexWrap="nowrap"
                spacing={{ sm: 1, md: 2 }}
            >
                <Link to={`/recipes/${recipe.recipeId}`}>
                    <Typography className='RecipeInfo-name' variant="h2">
                        {`${recipe.name.substring(0, 40)}`}
                    </Typography>
                </Link>
            </Stack>
            <Typography className='RecipeInfo-owner' variant="subtitle1">
                {"Submitted by "}
                <Link to={`/users/${recipe.owner}`}>{recipe.owner}</Link>
            </Typography>
            <Typography className='RecipeInfo-description' variant="body1">
                {recipe.description.length > 100
                    ? `${recipe.description.substring(0, 100)}...`
                    : recipe.description
                }
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

            {showActions &&
                <IconButton
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        return toggleInCookbook(recipe);
                    }
                    }
                    className="CookbookIcon"
                >
                    <FontAwesomeIcon
                        icon={isInCookbook(recipe) ? faBookBookmark : faBook}
                        className={
                            isInCookbook(recipe)
                                ? "CookbookIcon-remove"
                                : "CookbookIcon-add"
                        }
                    />
                </IconButton>
            }
        </>
    );
}

export default RecipeInfo;