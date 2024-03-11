import "./UserCookbookPage.scss";
import { useParams } from "react-router-dom";
import CookbookRecipes from "../components/userViews/CookbookRecipesList";

import Container from "@mui/material/Container";


import { CookbookProvider } from "../helpers/cookbookContext";
import UserRecipeNav from "../components/userAuth/UserRecipeNav";

function CookbookPage() {

    // const { username } = useParams();

    return (
        <>
            {/* {username && <UserRecipeNav
                username={username}
                selected="cookbook"
            />} */}
            <Container className="Page-container" maxWidth="xl">
                {/* <CookbookProvider cookbookOwner={username!}> */}
                    <CookbookRecipes />
                {/* </CookbookProvider> */}
            </Container>
        </>
    );
}

export default CookbookPage;
