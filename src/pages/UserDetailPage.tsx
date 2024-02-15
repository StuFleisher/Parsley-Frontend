import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import ParsleyAPI from "../helpers/api"
import RecipeList from "../components/recipeDisplay/RecipeList";
import { useNavigate, useParams } from "react-router-dom"
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import './UserDetailPage.scss'

function UserDetailPage(){

    const { username } = useParams();
    const [user,setUser]=useState<User | "loading">("loading")
    // const [isLoading,setIsLoading]=useState(true)
    const navigate = useNavigate();

    useEffect(function fetchUserOnMount(){
        async function fetchUser(){
            if (username!==undefined) {
                try {
                    const userDetails = await ParsleyAPI.getUser(username);
                    setUser(userDetails);
                    // setIsLoading(false);
                } catch {
                    console.warn(`Couldn't find username:${username}`)
                    navigate('/users')
                }
            }
        }
        fetchUser();
    }, [username, navigate])

    return (
        <>
        {user !== "loading"
        ?
            <>
            <Card className="UserDetail-header">
                <Typography variant="h2" color="primary">
                    {user.username}
                </Typography>
                <Typography variant="subtitle2">
                    <Link to={`/users/${user.username}/cookbook`}>
                        View Cookbook
                    </Link>
                </Typography>
                <Typography variant="subtitle2">
                    Recipes: {user.recipes.length}
                </Typography>
            </Card>
            <RecipeList recipes={user.recipes}/>
            </>
        :
            <Typography>Loading</Typography>
        }
        </>

    )
}

export default UserDetailPage
