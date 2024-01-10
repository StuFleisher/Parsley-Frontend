import './RecipeInfo.scss';

function RecipeInfo({ recipe }: { recipe: IRecipe | SimpleRecipeData; }) {

    return (
        <div className="RecipeInfo">
            <h3 className='RecipeInfo-name'>{recipe.name}</h3>
            <p className='RecipeInfo-description'>{recipe.description}</p>

            {
                recipe.sourceUrl
                    ?
                        <p><a className='RecipeInfo-sourceName' href={recipe.sourceUrl}>
                            {recipe.sourceName}
                        </a></p>
                    :
                        <p className='RecipeInfo-sourceName'>
                            {recipe.sourceName}
                        </p>
            }
        </div>
    );
}

export default RecipeInfo;