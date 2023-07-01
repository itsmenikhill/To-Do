import React, { ChangeEvent, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isNull } from "util";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState("");

  const handleSubmit = async (values: any) => {
    const response = await axios.post("http://localhost:8000/signup", values);
    console.log("response: ", response)
    try {
      if (response!==null)
        navigate("/dashboard", {state:{email: email}})
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  };

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
          <form className="form-container" onSubmit={()=>handleSubmit({email: email, password: password})}>
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

export default SignUp;
