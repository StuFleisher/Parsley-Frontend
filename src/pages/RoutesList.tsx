import { Routes, Route } from "react-router-dom";
import RecipeDetailsPage from "./RecipeDetailsPage";
import Homepage from "./Homepage";
import RecipeListPage from "./RecipeListPage";
import EditRecipePage from "./EditRecipePage";
import AddRecipePage from './AddRecipePage';
import UserDetailPage from './UserDetailPage';
import LogOutPage from "./LogOutPage";
import CookbookPage from "./CookbookPage";
import NotFound from "./NotFound";
import {useContext} from "react";
import userContext from "../helpers/userContext";


type props = {
    login:(credentials:UserLoginData)=>void;
    register:(userInfo:User)=>void;
    logout: ()=>void;
}

function RoutesList({login, register, logout}:props) {

    const {username} = useContext(userContext);

    return (
        <>
        <Routes>
            <Route path='/' element={
                <Homepage
                    register={register}
                    login={login}/>
                }
            />
            <Route path='/recipes' element={<RecipeListPage />} />
            <Route path='/recipes/:id' element={<RecipeDetailsPage />} />

            {!username
            ?
                <>
                {/* <Route path='/login' element={<LoginForm doLogin={login} />}/>
                <Route path='/signup' element={<SignupForm doSignup={register} />}/> */}
                </>
            :
                <>
                <Route path='/recipes/add' element={<AddRecipePage />} />
                <Route path='/recipes/:id/edit' element={<EditRecipePage />} />
                <Route path='/users/:username' element={<UserDetailPage/> }/>
                <Route path='/users/:username/cookbook' element={<CookbookPage/> }/>
                <Route path='/auth/logOut' element={<LogOutPage logOut={logout}/>}/>
                </>
            }

            <Route path='*' element={<NotFound/>} />
        </Routes>
        </>
    );
}

export default RoutesList