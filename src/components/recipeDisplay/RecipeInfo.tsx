import { Link } from 'react-router-dom';
import { useContext } from 'react';

import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import './RecipeInfo.scss';
import { shortenString } from '../../helpers/utilities';

type props = {
    recipe: Recipe | SimpleRecipeData;
    variant: "simple" | "detailed";

};

function RecipeInfo({ recipe, variant }: props) {


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
                        {
                            variant === "simple"
                                ? shortenString(recipe.name, 40)
                                : recipe.name
                        }
                    </Typography>
                </Link>
            </Stack>
            <Typography className='RecipeInfo-owner' variant="subtitle1">
                {"Submitted by "}
                <Link to={`/users/${recipe.owner}`}>{recipe.owner}</Link>
            </Typography>
            <Typography className='RecipeInfo-description' variant="body1">
                {variant === "simple"
                    ? shortenString(recipe.description, 100)
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
        </>
    );
}

export default RecipeInfo;