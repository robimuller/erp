import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import './DashboardPage.css';

const DashboardPage = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="d-flex">
      <Sidebar onCollapse={handleSidebarCollapse} />
      <div className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;
