
import React from "react";

const userContext = React.createContext<IUser>({
  username: null,
  firstName: null,
  lastName: null,
  email:null,
  isAdmin: null,
});

export default userContext;
