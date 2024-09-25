import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class ParsleyAPI {

  //This token will be changed dynamically on login
  static token = "";

  static async request(
    endpoint: string,
    data = {},
    method = "get",
  ) {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ParsleyAPI.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      // console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async multipartRequest(
    endpoint: string,
    data: FormData,
    method = "put",
  ) {

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${ParsleyAPI.token}`
    };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      // console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /************************ USERS ********************************/

  /** AUTH */

  /** Register and sign-in a new user*/
  static async userSignup(data: IUser) {
    const response = await this.request('auth/register', data, 'post');
    ParsleyAPI.token = response.token;
    return response.token;
  }

  /** Log in a user*/
  static async userLogin(data: UserLoginData) {
    const response = await this.request('auth/token', data, 'post');
    ParsleyAPI.token = response.token;
    return response.token;
  }

  /** Log out current user*/
  static async userLogout() {
    ParsleyAPI.token = "";
  }

  /** Get the username from decoded token. Sets token and returns username.
   * token is a jwt with a username key.
  */

  static getUsernameFromToken(token: string) {
    const { username } = jwtDecode<TokenPayload>(token);
    ParsleyAPI.token = token;
    return username;
  }

  /** GET */

  //get full user data
  static async getUser(username: string) {
    const response = await this.request(`users/${username}`);
    return response.user;
  }

  //verify that the user exists
  static async verifyUser(username: string) {
    const response = await this.request(`users/${username}/verify`);
    return response.isUser;
  }

  /** UPDATE */

  static async updateUser(data: User, username: string) {
    const responseData = await this.request(`users/${username}`, data, 'patch');
    return responseData.user;
  }

  /************************ RECIPES ********************************/
  /**  CREATE  */

  static async generateRecipeFromText(formData: { recipeText: string; }): Promise<Recipe> {
    const response = await this.request('recipes/generate', formData, 'post');
    return response.recipe;
  }

  static async generateRecipeFromImage(image:Blob) {
    const formData = new FormData();
    formData.set('image', image);

    const response = await this.multipartRequest(
      `recipes/generate`,
      formData,
      'post'
    );

    return response.recipe;
  }

  static async createRecipe(recipe: IRecipe): Promise<Recipe> {
    const response = await this.request('recipes', recipe, 'post');
    return response.recipe;
  }


  /**  READ  */
  static async getRecipeById(id: Number): Promise<Recipe> {
    const response = await this.request(`recipes/${id}`);
    return response.recipe;
  }

  static async getUserRecipes(username: string) {
    const response = await this.request(
      `users/${username}/recipes`
    );
    return response.recipes;
  }

  static async getAllRecipes(query: string | null): Promise<SimpleRecipeData[]> {

    const response = query
      ? await this.request(`recipes?q=${query}`)
      : await this.request(`recipes`);
    return response.recipes;
  }

  /**  UPDATE  */
  static async UpdateRecipe(formData: Recipe): Promise<Recipe> {
    const response = await this.request(
      `recipes/${formData.recipeId}`,
      formData,
      'put'
    );
    return response.recipe;
  }

  static async updateRecipeImage(image: Blob, recipeId: number) {
    const formData = new FormData();
    formData.set('image', image);

    const response = await this.multipartRequest(
      `recipes/${recipeId}/image`,
      formData,
      'put'
    );
    return response.imageUrl;
  }

  /**  DELETE  */
  static async DeleteRecipe(id: number): Promise<Recipe> {
    const response = await this.request(
      `recipes/${id}`,
      undefined,
      'delete'
    );
    return response.recipe;
  }


  /************************ FAVORITES ********************************/
  static async getFavorites(username: string) {
    const response = await this.request(
      `users/${username}/favorites`
    );
    return response.favorites;
  }


  static async addToFavorites(recipeId: number, username: string) {
    const response = await this.request(
      `recipes/${recipeId}/addToFavorites`,
      { recipeId, username },
      'post'
    );
    if (response.statusCode === 201) { return true; }
    return false; //is this what we want to return here?
  }

  static async removeFromFavorites(recipeId: number, username: string) {
    const response = await this.request(
      `recipes/${recipeId}/removeFromFavorites`,
      { recipeId, username },
      'post'
    );
    if (response.statusCode === 200) { return true; }
    return false;
  }

  /************************ BUG REPORTS ********************************/

  static async createBugReport(reportedBy: string, reportText: string) {
    const response = await this.request(
      `bugReports`,
      { bugReport: { reportedBy, reportText } },
      'post'
    );
    return response.bugReport;
  }


}

export default ParsleyAPI;