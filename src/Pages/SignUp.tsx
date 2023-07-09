import React, { ChangeEvent, FormEvent, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

const SignUp = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState("");

  const handleSignup = async (values: any) => {
    const response = await axios.post("http://localhost:8000/signup", values);
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
    } catch (err) {
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSignup({ email, password });
    e.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    } else {
      setName(event.target.value);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="signup-container">
          <h2 className="form-heading">Sign Up</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
            />
            <button className="form-button">Create Account</button>
          </form>
          <div className="redirect-link">
            <Link className="login-link" to="/login">
              Already a member? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
