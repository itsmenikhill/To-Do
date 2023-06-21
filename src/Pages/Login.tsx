import React, { ChangeEvent, useState, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const signIn = useSignIn();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleLogin = async (values: any) => {
    console.log("Values", values)
    const response = await axios.post("http://localhost:8000/api/login", values);
    console.log("response:", response)
    try{
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType:"Bearer",
        authState: {email: values.email}
      })
    }
    catch(err){
      if(err){
        console.log(err);
      }
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h2 className="login-heading">Sign In</h2>
        <form className="form-container">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
          <button className="form-button" onClick={(e)=>handleLogin({email, password})}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
