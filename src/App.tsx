import { useState, useEffect } from 'react';
import './App.scss';
import userContext from './helpers/userContext';
import RoutesList from './pages/RoutesList';
import { BrowserRouter } from 'react-router-dom';
import ParsleyAPI from './helpers/api';

const ANON_USER:IUser = {
  username: null,
  firstName: null,
  lastName: null,
  email:null,
  isAdmin: null,
}

function App() {

  const [user, setUser] = useState<IUser>(ANON_USER);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  /** Sets state about our current user and token by doing the following:
     * -Stores the users token in local storages
     * -Sets the token property on the ParselyAPI class
     * -Makes an api call and updates the user state
     */
  useEffect(function fetchUserOnMountOrChange() {

    async function fetchUser() {
      if (token) {
        const username = ParsleyAPI.getUsernameFromToken(token);
        const userData = await ParsleyAPI.getUser(username);
        setUser(userData);
      }
    }

    fetchUser();
  }, [token]);

  /** Calls the api with login credentials and tries to log the user in
   * If successful, updates the token and the user states.
   * credentials: {username, password}
   */

  async function login(credentials:UserLoginData) {
    const token = await ParsleyAPI.userLogin(credentials);
    localStorage.setItem("token", token);
    setToken(token);
  }

  /** Logs the user out
   *  Clears token from localstorage and resets state for the app */
  function logout() {
    setUser(ANON_USER);
    localStorage.removeItem("token");
    ParsleyAPI.userLogout();
    setToken(null);
  }


  /** Calls the api with user data and tries to create a new account.
   * If successful, updates the token and user states.
   *
   * userInfo:{username, password, firstName, lastName, email}
   */
  async function register(userInfo:User) {
    const token = await ParsleyAPI.userSignup(userInfo);
    localStorage.setItem("token", token);
    setToken(token);
  }

  return (
    <div className="App">
      {
        (token && !user.username)
        ?
          <p>Loading</p>
        :
          <userContext.Provider value={user}>
            <BrowserRouter>
              <RoutesList login={login} register={register}/>
            </BrowserRouter>
          </userContext.Provider>
      }
    </div>
  );
}

export default App;
