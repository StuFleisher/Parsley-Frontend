import { Routes, Route } from "react-router-dom";
import RecipeDetailsPage from "./RecipeDetailsPage";
import Homepage from "./Homepage";
import RecipeListPage from "./RecipeListPage";
import EditRecipePage from "./EditRecipePage";
import AddRecipePage from './AddRecipePage';
import UserDetailPage from './UserDetailPage';
import LogOutPage from "./LogOutPage";
import CookbookPage from "./UserCookbookPage";
import NotFound from "./404";
import {useContext} from "react";
import userContext from "../helpers/userContext";
import RegistrationPage from "./RegistrationPage";
import LogInPage from "./LogInPage";
// import UserRegistrationForm from "../components/user/UserRegistrationForm";


type props = {
    login:(credentials: UserLoginData)=>Promise<void>,
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
                />
                }
            />
            <Route path='/recipes' element={<RecipeListPage />} />
            <Route path='/recipes/:id' element={<RecipeDetailsPage />} />
            <Route path='/users/:username' element={<UserDetailPage initialView="recipes"/> }/>
            <Route path='/users/:username/cookbook' element={<UserDetailPage initialView="cookbook"/> }/>
            <Route path='/users/:username/recipes' element={<UserDetailPage initialView="recipes"/> }/>

            {!username
            ?
            <>
                <Route path='/login' element={<LogInPage login={login} />}/>
                <Route path='/register' element={<RegistrationPage register={register}/>}/>
                </>
            :
            <>
                <Route path='/recipes/create' element={<AddRecipePage />} />
                <Route path='/recipes/:id/edit' element={<EditRecipePage />} />
                <Route path='/auth/logOut' element={<LogOutPage logOut={logout}/>}/>
                </>
            }

            <Route path='*' element={<NotFound/>} />
        </Routes>
        </>
    );
}

export default RoutesList