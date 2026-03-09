import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // Load user from localStorage
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.log("Invalid user in localStorage");
        localStorage.removeItem("user");
      }
    }

    // Always verify user if token exists
    if (token) {

      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {

        if (data && data.name) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }

      })
      .catch(() => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

      });

    }

  }, []);

  // LOGIN
  const login = (data) => {

    const userData = data.user || data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);

  };

  // LOGOUT
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