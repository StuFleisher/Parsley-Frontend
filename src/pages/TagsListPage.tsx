
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { emptyRecipeList } from "../helpers/recipeFactory";
import ParsleyAPI from "../helpers/api";
import RecipeList from "../components/recipeDisplay/RecipeList";
import Container from "@mui/material/Container";


function TagsListPage() {

  const {name}=useParams()
  const [recipes, setRecipes] = useState<SimpleRecipeData[]>(emptyRecipeList);
    const navigate = useNavigate();

    useEffect(function getRecipesOnMount() {

        async function fetchRecipes() {
            try {
                const recipesData = await ParsleyAPI.getRecipesByTag(name||"");
                setRecipes(recipesData);
            } catch (err) {
                console.log(err);
                navigate('/');
            }
        }

        fetchRecipes();

    }, [navigate, name]);

    return (
        <Container className="Page-container" maxWidth="xl">
            <RecipeList recipes={recipes} />
        </Container>
    );
}

export default TagsListPage;