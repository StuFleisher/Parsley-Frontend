import Container from "@mui/material/Container";
import RecipeList from "../components/recipeDisplay/RecipeList";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";



function UserRecipesPage() {

    const { owner } = useParams();

    return (

        <Container className="Page-container" maxWidth="xl">
                {/* <RecipeList recipes={owner} /> */}
        </Container>


    );
}