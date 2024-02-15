import { useParams } from "react-router-dom";

import CookbookRecipes from "../components/recipeDisplay/CookbookRecipes";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import { CookbookProvider } from "../helpers/cookbookContext";


function CookbookPage(){

    const {username} = useParams();

    return (
        <CookbookProvider username={username!}>

        <Card className="Cookbook-header">
            <Typography variant="h2" color="primary">
                {username}'s Cookbook
            </Typography>
        </Card>
        <CookbookRecipes/>

        </CookbookProvider>
    )
}

export default CookbookPage
