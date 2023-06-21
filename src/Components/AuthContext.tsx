import React, { createContext, useState } from "react";

interface Creds {
  email: string;
  password: string;
}

const ValidCreds: Creds = {
  email: "nikhil@gmail.com",
  password: "nikhil123",
};

const AuthContext = createContext<any>("");

const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState("");
  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = (newToken: string) => {
    setToken("");
  };
  return (
    <AuthContext.Provider value={{ValidCreds, token, login, logout}}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
