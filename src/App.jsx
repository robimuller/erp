// src/App.jsx
import './firebase-config'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import CRMPage from './pages/CRMPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* Dashboard layout route */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<div>Welcome to the Dashboard</div>} /> {/* Default dashboard view */}
          <Route path="crm" element={<CRMPage />} />
ó        </Route>
      </Routes>
    </Router>
  );
}

export default App;
