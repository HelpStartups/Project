import React from "react";
import "./Simulation.css";

const Simulation = () => {
  return (
    <div className="simulation-container">
      <h2 className="simulation-title">Phishing Email Simulation</h2>

      <div className="simulation-intro">
        <p>
          This section allows you to experience simulated phishing emails in a
          safe environment. Learn to spot red flags and test your
          decision-making under realistic conditions.
        </p>
      </div>

      <div className="simulation-box">
        <h3>📧 Sample Phishing Email</h3>
        <div className="email-card">
          <p>
            <strong>From:</strong> IT Support
            &lt;it-support@secure-notify.com&gt;
          </p>
          <p>
            <strong>Subject:</strong> Urgent Account Verification Needed!
          </p>
          <p className="email-content">
            Dear User,
            <br />
            We noticed suspicious login attempts on your account. For your
            safety, please verify your identity by clicking the link below:
            <br />
            <a href="http://fake-verification-link.com">Verify Now</a>
            <br />
            Failure to act within 24 hours may result in a temporary account
            suspension.
            <br />
            <br />
            Sincerely,
            <br />
            IT Support Team
          </p>
        </div>
        <div className="simulation-actions">
          <button className="btn-flag">🚩 Report Phishing</button>
          <button className="btn-safe">✅ Mark as Safe</button>
        </div>
      </div>

      <div className="simulation-note">
        <p>
          🔐 Note: No real data is sent — this simulation is for training
          purposes only.
        </p>
      </div>
    </div>
  );
};

export default Simulation;
