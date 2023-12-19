// src/pages/DashboardPage.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import './DashboardPage.css'; // Ensure this file exists and contains your custom styles

const DashboardPage = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Outlet />  {/* This will render the nested route components */}
      </div>
    </div>
  );
};

export default DashboardPage;
