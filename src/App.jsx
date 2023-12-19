// src/App.jsx
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
import CompanyRegistration from './components/crm/CompanyRegistration'; // Adjust the import path as necessary

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<div>Welcome to the Dashboard</div>} />
          <Route path="crm/*" element={<CRMPage />}>
            <Route path="register-company" element={<CompanyRegistration />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

