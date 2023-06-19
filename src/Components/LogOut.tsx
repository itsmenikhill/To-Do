import React from "react";
import {  } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "../App.css";
import { useNavigate } from "react-router-dom";

const LogOut = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div >
      <button className="logout" onClick={handleLogout}><FiLogOut /></button>
    </div>
  );
};

export default LogOut;
