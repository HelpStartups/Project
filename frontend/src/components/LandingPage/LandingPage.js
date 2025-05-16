import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to PhishAware</h1>
        <p>Your Cybersecurity Awareness Companion</p>
        <Link to="/login" className="get-started-btn">
          Get Started
        </Link>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>Realistic Simulations</h3>
          <p>Experience phishing scenarios that mimic real-world attacks.</p>
        </div>
        <div className="feature-card">
          <h3>Interactive Quizzes</h3>
          <p>Test your knowledge with engaging and educational quizzes.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Login</h3>
          <p>Protect your account with Multi-Factor Authentication.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 PhishAware. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
