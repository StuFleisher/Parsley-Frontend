import './Ingredient.scss'

function Ingredient({ingredient}:{ingredient:IIngredient}) {
    const {amount, description} = ingredient;

    return (
        <div className="Ingredient">
            <span className='capsule-left'>
                {amount}
            </span>
            <span className='capsule-right'>
                {description}
            </span>
        </div>
    )
}

export default Ingredient;