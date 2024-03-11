import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserRecipeNav from "../components/userAuth/UserRecipeNav";

import ParsleyAPI from "../helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import Container from "@mui/material/Container";

import { useLocation } from "react-router-dom";
import { CookbookProvider } from "../helpers/cookbookContext";
import CookbookRecipesList from "../components/userViews/CookbookRecipesList";
import { UserRecipesProvider } from "../helpers/userRecipesContext";

import './UserDetailPage.scss';
import UserRecipesList from "../components/userViews/UserRecipesList";

type props = {
    initialView: "cookbook" | "recipes";
};

function UserDetailPage({ initialView }: props) {

    const { username } = useParams();
    const location = useLocation();

    const navigate = useNavigate();
    const [view, setView] = useState<"cookbook" | "recipes">(initialView);

    useEffect(function switchViewsWithUrl() {
        const viewToShow = (
            location.pathname.includes('/cookbook')
                ? "cookbook"
                : "recipes"
        );
        setView(viewToShow)
    },[location,setView]);

    useEffect(function verifyUserOnMount() {
        async function verifyUser() {
            if (username !== undefined) {

                    const isUser = await ParsleyAPI.verifyUser(username);
                    if (!isUser){
                        console.warn(`Couldn't find username:${username}`);
                        navigate('/users');
                    }
            }
        }
        verifyUser();
    }, [username, navigate]);

    return (
        <>
            {username && <UserRecipeNav username={username} selected={view} />}
            <Container className="Page-container" maxWidth="xl">

                <CookbookProvider cookbookOwner={username!}>
                    <UserRecipesProvider owner={username!}>
                        {view === "cookbook" &&
                            <CookbookRecipesList />
                        }
                        {view === "recipes" &&
                            <UserRecipesList />
                        }
                    </UserRecipesProvider >
                </CookbookProvider>
            </Container>


        </>
    );
}

export default UserDetailPage;
