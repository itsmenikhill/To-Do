import React, { ChangeEvent, useState, useEffect, FormEventHandler, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../Components/MyContext";

const Login = () => {

  const navigate = useNavigate();
  const ValidCreds = useContext(MyContext);
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
          <button className="form-button" onClick={handleClick}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
