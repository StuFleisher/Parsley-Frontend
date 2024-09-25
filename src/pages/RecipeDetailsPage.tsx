import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { FavoritesProvider } from "../helpers/favoritesContext";
import userContext from "../helpers/userContext";
import Container from "@mui/material/Container";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ParsleyAPI from "../helpers/api";
import RecipeCard from "../components/recipeDisplay/RecipeCard";

function RecipeDetailsPage() {

    const { id } = useParams();
    const { username } = useContext(userContext);

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const navigate = useNavigate();

    useEffect(function fetchRecipeOnMount() {
        async function fetchRecipe() {
            try {
                if (id !== undefined) {
                    const numericId = parseInt(id);
                    const recipeDetails = await ParsleyAPI.getRecipeById(numericId);
                    setRecipe(recipeDetails);
                }
            } catch (err) {
                navigate('/recipes');
            }
        }
        fetchRecipe();

    }, [id, navigate]);



    return (

        <FavoritesProvider username={username!}>
            <Container className="Page-container" maxWidth="xl">

                {!recipe
                    ?
                    <LoadingSpinner />
                    :
                    <>
                        <RecipeCard recipe={recipe} />
                        {username !== recipe.owner ? "" : <Link to={`/recipes/${recipe.recipeId}/edit`}> Edit this Recipe</Link>}
                    </>}
            </Container>
        </FavoritesProvider>
    );

}

export default RecipeDetailsPage;