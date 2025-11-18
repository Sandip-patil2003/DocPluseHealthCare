// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/apiHelper";

const AuthContext = createContext();

let inMemoryToken = null;
export const getToken = () => inMemoryToken;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    let userData = response.data.user;
    // Fallback: if userData is undefined, try response.data or set a dummy user
    if (!userData) {
      userData = response.data || { username };
    }
    inMemoryToken = response.data.token;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", response.data.token);
  };

  // Log user state after it is updated
  useEffect(() => {
    if (user) {
      console.log("User state updated:", user);
    }
  }, [user]);

  const logout = () => {
    inMemoryToken = null;
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      inMemoryToken = storedToken;
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
