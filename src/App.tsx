import React, { FC, useState, ChangeEvent } from "react";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";

const App: FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
