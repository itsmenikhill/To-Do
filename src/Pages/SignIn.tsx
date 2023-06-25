import React, { ChangeEvent, useState } from "react";
import "../App.css";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState("");

  const handleSubmit = () => {};

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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
        <div className="login-container">
          <h2 className="form-heading">Sign Up</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your name" name="name" onChange={handleChange} />
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
        </div>
      </div>
    </div>
  );
};

export default SignIn;
