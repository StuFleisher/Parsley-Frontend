import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleLayout from "../components/ui/SimpleLayout";

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

        <SimpleLayout src="/images/banner01.jpg">
            Logging out...
        </SimpleLayout>
    )
}

export default LogOutPage;