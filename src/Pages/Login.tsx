import React, { ChangeEvent, useState, FormEvent } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
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
    const response = await axios.post("http://localhost:8000/login", values);
    try {
      if (
        signIn({
          token: response.data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: { email: values.email },
        })
      )
        navigate("/dashboard", { state: { email: email } });
    } catch (err) {}
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleLogin({ email, password });
    e.preventDefault();
  };

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
          <button className="form-button">Login</button>
        </form>
        <div className="redirect-link">
          <Link className="link" to="/signup">New user? Create an account</Link>
        </div> 
      </div>
    </div>
  );
};

export default Login;
