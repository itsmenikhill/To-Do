import React, { ChangeEvent, useState, useContext } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/AuthContext";
import jwt from "jsonwebtoken";

const Login = () => {
  const navigate = useNavigate();
  const { ValidCreds, token, login, logout } = useContext(AuthContext);
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

  const payload = {
    email: ValidCreds.email,
    password: ValidCreds.password,
  };

  const generateToken = (data: any) => {
    const secretKey = "SECRET_KEY";
    // const getToken = jwt.sign(data,null);
    // console.log(getToken)
    // return getToken;
  };

  const handleLogin = () => {
    const validToken = generateToken(payload);
    console.log(validToken)
    const newPayload = {
      email: email,
      password: password,
    }
    console.log(email+" "+password)
    const newToken = generateToken(newPayload);
    if(validToken===newToken){
      login(newToken);
      navigate("/dashboard")
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
          <button className="form-button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
