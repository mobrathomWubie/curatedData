import React from 'react';
import './Dashboard.css';
import Footer from './Footer';
const Dashboard = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'Verified',
  };

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <h1>Dashboard</h1>
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> <span className="status">{user.status}</span></p>
        </div>
      </main>
    
    </div>
  );
};

export default Dashboard;