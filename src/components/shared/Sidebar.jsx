// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './Sidebar.css'; // Your custom CSS for the sidebar

const Sidebar = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    onCollapse(!collapsed); // Inform parent component about the change
  };

  const sidebarClass = collapsed ? "sidebar collapsed" : "sidebar";

  return (
    <div className={sidebarClass} style={{ width: collapsed ? '5vw' : '15vw' }}>
      <button className="btn" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      <div className="sidebar-items">
        <NavLink to="/dashboard" className="sidebar-item">
          <i className="bi bi-house-door"></i>
          <span className="sidebar-text">Home</span>
        </NavLink>
        <NavLink to="/dashboard/crm" className="sidebar-item">
          <i className="bi bi-person-lines-fill"></i>
          <span className="sidebar-text">Ügyfélkezelés</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
