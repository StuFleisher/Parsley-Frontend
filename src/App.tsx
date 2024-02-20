import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

import userContext from './helpers/userContext';

import RoutesList from './pages/RoutesList';
import ParsleyAPI from './helpers/api';
import NavBar from './components/ui/NavBar';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { ThemeProvider } from '@mui/material';
import parsleyTheme from './styles/theme';
import { Container } from '@mui/material';

const ANON_USER: IUser = {
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  isAdmin: null,
};

function App() {

  const [user, setUser] = useState<IUser>(ANON_USER);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [error, setError] = useState<string | null>(null);

  /** Sets state about our current user and token by doing the following:
     * -Stores the users token in local storages
     * -Sets the token property on the ParselyAPI class
     * -Makes an api call and updates the user state
     */
  useEffect(function fetchUserOnMountOrChange() {
    async function fetchUser() {
      try {
        if (token) {
          const username = ParsleyAPI.getUsernameFromToken(token);
          const userData = await ParsleyAPI.getUser(username);
          setUser(userData);
        }
      } catch (e:any) {
        setError(()=> `Error fetching user: ${e}`);
      }
    }

      fetchUser();
  }, [token]);

  /** Calls the api with login credentials and tries to log the user in
   * If successful, updates the token and the user states.
   * credentials: {username, password}
   */

  async function login(credentials: UserLoginData) {
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
  async function register(userInfo: User) {
    const token = await ParsleyAPI.userSignup(userInfo);
    localStorage.setItem("token", token);
    setToken(token);
  }


  if (error) {
    return (
      <ThemeProvider theme={parsleyTheme}>
      <Box className="App">
        <BrowserRouter>
          <NavBar login={login} />
          <Container className="App-page">
            <Box className="App-errors">
              <Typography variant="h2">Sorry, we had trouble loading the page</Typography>
              <Typography variant="body1" color="charcoal">{error}</Typography>
            </Box>
          </Container>
        </BrowserRouter>
      </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={parsleyTheme}>
      <Box className="App">
        {
          (token && !user.username)
            ?
            <Container className="App-page">
              <p>Loading</p>
            </Container>
            :
            <userContext.Provider value={user}>
              <BrowserRouter>
                <NavBar login={login} />
                <Container className="App-page">
                  <RoutesList
                    login={login}
                    register={register}
                    logout={logout}
                  />
                </Container>
              </BrowserRouter>
            </userContext.Provider>
        }
      </Box>
    </ThemeProvider>
  );
}

export default App;
