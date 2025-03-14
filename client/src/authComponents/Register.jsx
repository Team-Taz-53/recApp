import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  const regRequest = async () => {
    try {
    console.log("regRequest entered")
      if (!username || !password || !location) {
        console.error("Registration failed: Empty fields.");
        alert("Username and password cannot be empty.");
        return;
      }
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          location: location,
        }),
      });
      if (response.ok) {
        console.log("You are logged in");
        navigate("/dashboard", {
          state: { username: `${username}` },
        });
      } else {
        const error = await response.json();
        console.error('Login failed', error);
        alert('Login failed');
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error: Please try again later.");
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <div className="inputs">
        <label className="label" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="inputs">
        {" "}
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="inputs">
        {" "}
        <label className="label" htmlFor="location">
          Location
        </label>
        <input
          id="location"
          type="location"
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="card">
        {/* onclick, this should update the refs  */}
        <button
          onClick={(e) => {
            e.preventDefault();
            regRequest();
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
