import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import Container from "@mui/material/Container";

import { FavoritesProvider } from "../helpers/favoritesContext";
import { UserRecipesProvider } from "../helpers/userRecipesContext";
import ParsleyAPI from "../helpers/api";
import UserRecipeNav from "../components/userAuth/UserRecipeNav";
import FavoritesRecipesList from "../components/userViews/FavoritesRecipesList";

import './UserDetailPage.scss';
import UserRecipesList from "../components/userViews/UserRecipesList";

type props = {
    initialView: "favorites" | "recipes";
};

function UserDetailPage({ initialView }: props) {

    const { username } = useParams();
    const location = useLocation();

    const navigate = useNavigate();
    const [view, setView] = useState<"favorites" | "recipes">(initialView);

    useEffect(function switchViewsWithUrl() {
        const viewToShow = (
            location.pathname.includes('/favorites')
                ? "favorites"
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

                <FavoritesProvider username={username!}>
                    <UserRecipesProvider owner={username!}>
                        {view === "favorites" &&
                            <FavoritesRecipesList />
                        }
                        {view === "recipes" &&
                            <UserRecipesList />
                        }
                    </UserRecipesProvider >
                </FavoritesProvider>
            </Container>
        </>
    );
}

export default UserDetailPage;
