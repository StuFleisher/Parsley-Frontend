import { useState, useEffect } from "react"

import ParsleyAPI from "../helpers/api"
import { useNavigate, useParams } from "react-router-dom"
import { Typography } from "@mui/material";

type Props = {
}

function UserDetailPage({}:Props){

    const { username } = useParams();
    const [user,setUser]=useState<IUser | "loading">("loading")
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
                <Typography>{user.username}</Typography>
                <Typography>{user.firstName} {user.lastName}</Typography>
                <Typography>{user.email}</Typography>
            </>
        :
            <Typography>Loading</Typography>
        }
        </>

    )
}

export default UserDetailPage

// username:string | null,
//   password?: string | null,
//   firstName: string | null,
//   lastName: string | null,
//   email:string | null,