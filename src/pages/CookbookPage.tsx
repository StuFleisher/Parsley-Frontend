import { useParams } from "react-router-dom";

import CookbookRecipes from "../components/recipeDisplay/CookbookRecipes";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { CookbookProvider } from "../helpers/cookbookContext";


function CookbookPage() {

    const { username } = useParams();

    return (
        <Container className="Page-container" maxWidth="xl">
            <CookbookProvider username={username!}>

                <Card className="Cookbook-header">
                    <Typography variant="h2" color="primary">
                        {username}'s Cookbook
                    </Typography>
                </Card>
                <CookbookRecipes />

            </CookbookProvider>
        </Container>
    );
}

export default CookbookPage;
