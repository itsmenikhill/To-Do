import React, { ChangeEvent, useState, useEffect, FormEventHandler } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

  interface Creds {
    email: string;
    password: string;
  }

  const ValidCreds:Creds = {
    email: "nikhil@gmail.com",
    password: "nikhil123"
  }

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleClick = () => {
    if(ValidCreds.email===email && ValidCreds.password===password){
      navigate("/dashboard")
    }
  }

  return (
    <div className="container">
      <div className="login-container">
        <h2>Sign In</h2>
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
          <button className="form-button" onClick={handleClick}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
