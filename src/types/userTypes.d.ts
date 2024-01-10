
 interface IUser {
  username:string | null,
  password?: string | null,
  firstName: string | null,
  lastName: string | null,
  email:string | null,
  isAdmin:boolean | null,
}

type User = IUser & {
  username:string,
  password?: string,
  firstName: string,
  lastName: string,
  email:string,
  isAdmin:boolean,
}

type UserLoginData = {
  username:string,
  password:string,
}

type TokenPayload = {
  username:string,
  isAdmin:boolean,
}