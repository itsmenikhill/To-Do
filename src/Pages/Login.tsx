import React, { ChangeEvent, useState, FormEvent } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignIn } from "react-auth-kit";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const signIn = useSignIn();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const handleLogin = async (values: any) => {
    console.log("Values", values);
    const response = await axios.post(
      "http://localhost:8000/login",
      values
    );
    console.log("response:", response);
    try {
      if (
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: values.email },
        })
      )
        navigate("/dashboard", {state:{email: email}})
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleLogin({email, password});
    e.preventDefault()
  }

  return (
    <div className="container">
      <div className="login-container">
        <h2 className="form-heading">Log In</h2>
        <form className="form-container" onSubmit={handleSubmit}>
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
          <button
            className="form-button"
            // onClick={(e) => handleLogin({ email, password })}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
