import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type props = {
    logOut:()=>void;
}

function LogOutPage({logOut}:props){
    const navigate = useNavigate();

    useEffect(function NavigateOnMount(){
        console.log("logging out")
        logOut()
        navigate('/')
    },[logOut, navigate])

    return <>Logging out...</>
}

export default LogOutPage