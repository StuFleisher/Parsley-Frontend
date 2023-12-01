

function Ingredient({ingredient}:{ingredient:IIngredient}) {
    const {amount, description} = ingredient;

    return (
        <li className="Ingredient">{amount} {description}</li>
    )
}

export default Ingredient;