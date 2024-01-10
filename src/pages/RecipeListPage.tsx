import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParsleyAPI from "../helpers/api";
import RecipeInfo from "../components/recipeDisplay/RecipeInfo";


function RecipeListPage() {

    const [recipes, setRecipes] = useState<SimpleRecipeData[]>([]);
    const navigate = useNavigate();
    useEffect(function getRecipesOnMount() {

        async function fetchRecipes() {
            try {
                const recipesData = await ParsleyAPI.getAllRecipes();
                setRecipes(recipesData);
            } catch (err) {
                console.log(err);
                navigate('/');
            }
        }

        fetchRecipes();


    }, [navigate]);



    return (
        <div>
                {recipes.map((recipe, i)=>{
                    return <RecipeInfo recipe={recipe} key={i}/>
                })}

        </div>
    );
}

export default RecipeListPage;