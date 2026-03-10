import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Invalid user in localStorage");
        localStorage.removeItem("user");
      }
    }

    if (token) {

      API.get("/auth/me")
        .then(res => {

          const data = res.data;

          if (data && data.name) {

            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);

          }

        })
        .catch(() => {

          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);

        });

    }

  }, []);

  /* =========================
     LOGIN
  ========================= */

  const login = (data) => {

    const userData = data.user || data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

  };

  return (

    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>

  );

};