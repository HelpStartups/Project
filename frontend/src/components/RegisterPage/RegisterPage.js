import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Integrate backend API here
    console.log("Registering user:", userData);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Your Account</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={userData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={userData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>

      <p className="register-helper">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default RegisterPage;
