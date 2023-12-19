// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className="sidebar d-flex flex-column">
      <NavLink to="/dashboard" className="sidebar-item">Home</NavLink>
      <NavLink to="/warehouse-management" className="sidebar-item">Warehouse Management</NavLink>
      <NavLink to="/logistics" className="sidebar-item">Logistics</NavLink>
      <NavLink to="/crm" className="sidebar-item">CRM</NavLink>
    </nav>
  );
};

export default Sidebar;
