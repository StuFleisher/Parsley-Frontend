import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class ParsleyAPI {

  //This token will be changed dynamically on login
  static token="";

  static async request(endpoint: string, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ParsleyAPI.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /************************ USERS ********************************/

  /** AUTH */

  /** Register and sign-in a new user*/
  static async userSignup(data:User){
    const response = await this.request('auth/register', data,'post');
    ParsleyAPI.token = response.token;
    return response.token;
  }

  /** Log in a user*/
  static async userLogin(data:UserLoginData){
    const response = await this.request('auth/token', data,'post');
    ParsleyAPI.token = response.token;
    console.log("logging in with token", response.token)
    return response.token;
  }

  /** Log out current user*/
  static async userLogout(){
    ParsleyAPI.token = "";
  }

  /** Get the username from decoded token. Sets token and returns username.
   * token is a jwt with a username key.
  */

  static getUsernameFromToken(token:string){
    const { username } = jwtDecode<TokenPayload>(token);
    ParsleyAPI.token = token;
    return username;
  }

  /** GET */

  static async getUser(username:string){
    const response = await this.request(`users/${username}`);
    return response.user;
  }

  /** UPDATE */

  static async updateUser(data:User, username:string){
    const responseData = await this.request(`users/${username}`, data, 'patch')
    return responseData.user;
  }

  /************************ RECIPES ********************************/
  /**  CREATE  */

  static async generateRecipe(formData:{recipeText:string}): Promise<IRecipe>{
    const response = await this.request('recipes/generate', formData,'post');
    return response.recipe;
  }

  static async createRecipe(recipe:IRecipe): Promise<IRecipe> {
    const response = await this.request('recipes', recipe, 'post');
    return response.recipe;
  }


  /**  READ  */
  static async getRecipeById(id: Number): Promise<IRecipe> {
    const response = await this.request(`recipes/${id}`);
    return response.recipe;
  }

  static async getAllRecipes(): Promise<SimpleRecipeData[]> {
    const response = await this.request('recipes');
    return response.recipes;
  }

  /**  UPDATE  */
  static async UpdateRecipe(formData: IRecipe): Promise<IRecipe> {
    const response = await this.request(
      `recipes/${formData.recipeId}`,
      formData,
      'put'
    );
    return response.recipe;
  }

  /**  DELETE  */
  static async DeleteRecipe(id: number): Promise<IRecipe> {
    const response = await this.request(
      `recipes/${id}`,
      undefined,
      'delete'
    );
    return response.recipe;
  }



}

export default ParsleyAPI;