import { createContext, useContext, useEffect, useState } from "react";
import axios from "../../api/axios";
import apiInstance from "../../api/axios";

const AuthContext = createContext({});

const RELOAD_USER = "/reloaduser";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      const ReloadUser = async () => {
        try {
          const response = await axios.post(RELOAD_USER, {
            headers: {
              "Content-Type": "application/json", // Adjust the content type as needed
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          // console.log(response?.data?.data);
          setUser(response?.data?.data);
          setAuth(response?.data?.data);
        } catch (error) {
          console.error(error);
        }
      };
      ReloadUser();
    }
  }, [user]);
  // console.log(user);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
