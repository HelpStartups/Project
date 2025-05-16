import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <div className="dashboard-summary">
          <div className="card">
            <h2>Phishing Attempts Blocked</h2>
            <p>12</p>
          </div>
          <div className="card">
            <h2>Quiz Score</h2>
            <p>85%</p>
          </div>
          <div className="card">
            <h2>Completed Modules</h2>
            <p>3 / 5</p>
          </div>
        </div>
        <div className="dashboard-tips">
          <h2>Cybersecurity Tips</h2>
          <ul>
            <li>Never click on unknown links.</li>
            <li>Verify email sender addresses.</li>
            <li>Use strong and unique passwords.</li>
            <li>Always enable Multi-Factor Authentication (MFA).</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
