import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      // Simulate sending OTP (frontend doesn't actually do this in current backend)
      setOtpSent(true);
    } else {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, otp }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Login successful!");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Login failed!");
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login to PhishAware</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {otpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        <button type="submit">{otpSent ? "Verify & Login" : "Send OTP"}</button>
      </form>

      <p className="login-helper">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;
