import LoginForm from "../components/user/loginForm"
import {useContext} from "react";
import userContext from "../helpers/userContext"

type props = {
    login:Function,
    register:Function,
}

function Homepage ({login, register}:props) {

    const {username} = useContext(userContext)

    return (
        <div>
            <p>Homepage</p>
            {username
            ?
                <></>
            :
                <LoginForm
                    login={login}/>}
        </div>
    )
}

export default Homepage