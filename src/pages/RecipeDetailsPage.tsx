import ParsleyAPI from "../helpers/api";
import RecipeCard from "../components/recipeDisplay/RecipeCard";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import userContext from "../helpers/userContext";

import { CookbookProvider } from "../helpers/cookbookContext";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LoadingSpinner from "../components/ui/LoadingSpinner";
// import testRecipe from "../tempData";



function RecipeDetailsPage() {

    const { id } = useParams();
    const { username } = useContext(userContext);

    const [isLoading, setIsLoading] = useState(true);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const navigate = useNavigate();

    useEffect(function fetchRecipeOnMount() {
        async function fetchRecipe() {
            try {
                if (id !== undefined) {
                    const numericId = parseInt(id);
                    const recipeDetails = await ParsleyAPI.getRecipeById(numericId);
                    setRecipe(recipeDetails);
                    setIsLoading(false);
                }
            } catch (err) {
                navigate('/recipes');
            }
        }
        fetchRecipe();

    }, [id, navigate]);



    return (

        <CookbookProvider cookbookOwner={username!}>
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
        </CookbookProvider>
    );

}

export default RecipeDetailsPage;