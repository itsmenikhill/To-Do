import React from "react";
import {  } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

const LogOut = () => {

  const navigate = useNavigate();

  const signOut = useSignOut();
  const logout = () =>{
    signOut();
    navigate("/login")   
  }

  return (
    <div>
      <button className="logout" onClick={logout}><FiLogOut /></button>
    </div>
  );
};

export default LogOut;
