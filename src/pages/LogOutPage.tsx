import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

type props = {
    logOut: () => void;
};

function LogOutPage({ logOut }: props) {
    const navigate = useNavigate();

    useEffect(function NavigateOnMount() {
        console.log("logging out");
        logOut();
        navigate('/');
    }, [logOut, navigate]);

    return (
        <Container className="Page-container" maxWidth="xl">
            Logging out...
        </Container>);
}

export default LogOutPage;