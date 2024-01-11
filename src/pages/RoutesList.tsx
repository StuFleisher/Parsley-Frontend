import { Routes, Route, Navigate } from "react-router-dom";
import RecipeDetailsPage from "./RecipeDetailsPage";
import Homepage from "./Homepage";
import NotFound from "./NotFound";
import RecipeListPage from "./RecipeListPage";
import EditRecipePage from "./EditRecipePage";
import AddRecipePage from './AddRecipePage';
import NavBar from "../components/ui/NavBar";
import {useContext} from "react";
import userContext from "../helpers/userContext";


type props = {
    login:Function,
    register:Function,
}

function RoutesList({login, register}:props) {

    const {username} = useContext(userContext);

    return (
        <>
        <Routes>
            <Route path='/' element={
                <Homepage
                    register={register}
                    login={login}/>}
            />
            {!username
            ?
                <>
                {/* <Route path='/login' element={<LoginForm doLogin={login} />}/>
                <Route path='/signup' element={<SignupForm doSignup={register} />}/> */}
                </>
            :
                <>
                <Route path='/recipes' element={<RecipeListPage />} />
                <Route path='/recipes/add' element={<AddRecipePage />} />
                <Route path='/recipes/:id' element={<RecipeDetailsPage />} />
                <Route path='/recipes/:id/edit' element={<EditRecipePage />} />
                </>
            }

            <Route path='*' element={<NotFound/>} />
        </Routes>
        </>
    );
}

export default RoutesList