
 interface IUser {
  username:string | null,
  password?: string | null,
  firstName: string | null,
  lastName: string | null,
  email:string | null,
  isAdmin?:boolean | null,
}

type User = IUser & {
  username:string,
  firstName: string,
  lastName: string,
  email:string,
  isAdmin:boolean,
  recipes:SimpleRecipeData[],
  cookbook:SimpleRecipeData[],
}

type UserLoginData = {
  username:string,
  password:string,
}

type UserRegistrationData = {
  email:string,
  username:string,
  password:string,
  confirmPassword:string,
}

type TokenPayload = {
  username:string,
  isAdmin:boolean,
}

type CookbookContextObject = {
  cookbook:SimpleRecipeData[];
  addToCookbook: Function | null;
  removeFromCookbook: Function | null;
}