// src/pages/DashboardPage.jsx
import React from 'react';
import Sidebar from '../components/shared/Sidebar'; // Adjust the path as necessary

const DashboardPage = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardPage;
