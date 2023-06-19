import React, { FC, useState, ChangeEvent } from "react";
import "./App.css";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyProvider } from "./Components/MyContext";

const App: FC = () => {
  return (
    <div className="App">
      <MyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </MyProvider>
    </div>
  );
};

export default App;
