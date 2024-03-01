import ImageForm from "../ui/ImageForm";

type props = {
    updateRecipeImage: Function;
}

function RecipeImageForm({updateRecipeImage}:props){

    return (
        <ImageForm imgUrl="" onSubmit={updateRecipeImage}/>
    )

}

export default RecipeImageForm;