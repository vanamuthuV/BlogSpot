import { createContext, useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!user) {
        axios.get('/fetchuserdata').then(res => console.log(res))
    }
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;