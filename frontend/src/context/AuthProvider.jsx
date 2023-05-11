import React, { useState, useEffect, createContext } from "react";
import { getData } from "../api/interceptor";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  //Valida si existe un token y lo envia a la api para tratar de loguear al usuario
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const { data } = await getData("users/perfil", config);
      console.log(data);
      setAuth(data);
      setLoading(false);
      navigate("/projects");
    };

    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ setAuth, auth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
