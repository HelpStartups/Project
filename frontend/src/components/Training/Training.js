import React from "react";
import "./Training.css";

const Training = () => {
  return (
    <div className="training-container">
      <h2 className="training-title">Phishing Awareness Training</h2>
      <div className="training-section">
        <h3>🎯 Objective</h3>
        <p>
          This training module is designed to help employees and individuals
          identify phishing threats and adopt safe practices when handling
          suspicious emails or websites.
        </p>
      </div>

      <div className="training-section">
        <h3>📚 Modules</h3>
        <ul>
          <li>
            <strong>1. Introduction to Phishing:</strong> What phishing is, and
            why it’s dangerous.
          </li>
          <li>
            <strong>2. Recognizing Phishing Emails:</strong> Common traits and
            red flags.
          </li>
          <li>
            <strong>3. URL and Link Analysis:</strong> Spotting suspicious links
            and spoofed websites.
          </li>
          <li>
            <strong>4. Real-world Examples:</strong> Case studies from known
            phishing attacks.
          </li>
          <li>
            <strong>5. Reporting Mechanisms:</strong> How to report phishing
            attempts in your organization.
          </li>
        </ul>
      </div>

      <div className="training-section">
        <h3>🛠 Best Practices</h3>
        <ul>
          <li>Never click on suspicious links or attachments.</li>
          <li>Verify the sender’s email address and context.</li>
          <li>Enable multi-factor authentication wherever possible.</li>
          <li>Use company-approved communication tools.</li>
        </ul>
      </div>

      <div className="training-section">
        <h3>📦 Resources</h3>
        <p>
          Downloadable materials, videos, and checklists will be provided at the
          end of the session to reinforce learning.
        </p>
      </div>

      <div className="training-section training-cta">
        <p>Ready to test your knowledge?</p>
        <a href="/quiz" className="start-quiz-btn">
          Take the Quiz
        </a>
      </div>
    </div>
  );
};

export default Training;
