import ImageForm from "../ui/ImageForm";

type props = {
    updateRecipeImage: Function;
}

function RecipeImageForm({updateRecipeImage}:props){

    return (
        <ImageForm onSubmit={updateRecipeImage}/>
    )

}

export default RecipeImageForm;