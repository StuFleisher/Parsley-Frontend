import ImageForm from "../ui/ImageForm";

type props = {
    updateRecipeImage: Function;
    imageUrl: string;
}

function RecipeImageForm({updateRecipeImage, imageUrl}:props){

    return (
        <ImageForm onSubmit={updateRecipeImage} imageUrl={imageUrl}/>
    )

}

export default RecipeImageForm;