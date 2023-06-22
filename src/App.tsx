import React, { FC, useState, ChangeEvent } from "react";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";

const App: FC = () => {
  return (
    <div className="App">
      <AuthProvider
        authType={"cookie"}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth loginPath="/login">
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
