import React from "react";
import axios from "axios";
import logo from "../assets/logo.jpg";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      
      if (response.data.success) {
         console.log(response.data.auth_token);

        localStorage.setItem('token', response.data.auth_token);

        navigate("/Home");
      } else {
         alert(response.body.message)

      }
    } catch (error) {
      alert(error.body.message)
    }
  };

  return (
    <div className="wrraper">
      <img className="logo" src={logo} alt="logo" />
      <div className="login-box">
        <h2>PTC-ERP</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              onChange={handleUsername}
              type="text"
              value={username}
              required
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              onChange={handlePassword}
              type="password"
              value={password}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
