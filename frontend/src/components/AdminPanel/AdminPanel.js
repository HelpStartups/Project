import React, { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", quizzesTaken: 3, simulationScore: 80 },
    { id: 2, name: "Bob", quizzesTaken: 2, simulationScore: 65 },
    { id: 3, name: "Charlie", quizzesTaken: 4, simulationScore: 90 },
  ]);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel</h2>

      <div className="admin-section">
        <h3>User Progress Overview</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Quizzes Taken</th>
              <th>Simulation Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.quizzesTaken}</td>
                <td>{user.simulationScore}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-section">
        <h3>Push New Simulation</h3>
        <form className="simulation-form">
          <input type="text" placeholder="Simulation Title" required />
          <textarea placeholder="Simulation Content..." required />
          <button type="submit">Send Simulation</button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
