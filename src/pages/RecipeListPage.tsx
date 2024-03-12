
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { emptyRecipeList } from "../helpers/recipeFactory";
import ParsleyAPI from "../helpers/api";
import RecipeList from "../components/recipeDisplay/RecipeList";
import Container from "@mui/material/Container";


function RecipeListPage() {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [recipes, setRecipes] = useState<SimpleRecipeData[]>(emptyRecipeList);
    const navigate = useNavigate();

    useEffect(function getRecipesOnMount() {

        async function fetchRecipes() {
            try {
                const recipesData = await ParsleyAPI.getAllRecipes(query);
                setRecipes(recipesData);
            } catch (err) {
                console.log(err);
                navigate('/');
            }
        }

        fetchRecipes();

    }, [navigate, query]);

    return (
        <Container className="Page-container" maxWidth="xl">
            <RecipeList recipes={recipes} />
        </Container>
    );
}

export default RecipeListPage;