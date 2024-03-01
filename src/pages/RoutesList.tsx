import { Routes, Route } from "react-router-dom";
import RecipeDetailsPage from "./RecipeDetailsPage";
import Homepage from "./Homepage";
import RecipeListPage from "./RecipeListPage";
import EditRecipePage from "./EditRecipePage";
import AddRecipePage from './AddRecipePage';
import UserDetailPage from './UserDetailPage';
import LogOutPage from "./LogOutPage";
import CookbookPage from "./CookbookPage";
import LoginForm from "../components/user/loginForm";
import NotFound from "./NotFound";
import {useContext} from "react";
import userContext from "../helpers/userContext";
import UserRegistrationForm from "../components/user/UserRegistrationForm";


type props = {
    login:(credentials:UserLoginData)=>Promise<void>;
    register:(userInfo:IUser)=>Promise<void>;
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
                <Route path='/login' element={<LoginForm login={login} />}/>
                <Route path='/auth/register' element={<UserRegistrationForm register={register}/>}/>
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