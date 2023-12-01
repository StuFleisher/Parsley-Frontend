function RecipeInfo({ recipe }: { recipe: IRecipe; }) {

    return (
        <div className="Recipe-info">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>

            {
                recipe.sourceUrl
                    ?
                    <p><a href={recipe.sourceUrl}>{recipe.sourceName}</a></p>
                    :
                    <p>Source: {recipe.sourceName}</p>
            }
        </div>
    );
}

export default RecipeInfo;