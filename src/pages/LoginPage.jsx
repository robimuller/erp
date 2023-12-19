// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginUser(email, password);
            console.log('Logged in user:', user);
            navigate('/dashboard'); // Redirect to the dashboard after login
        } catch (error) {
            console.error('Login failed:', error.message);
            // Handle login failure
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
            </form>
            <div className="mt-3">
                <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
            </div>
            <div className="mt-3">
                <Link to="/register" className="text-decoration-none">Not registered yet? Create an account</Link>
            </div>
            <div className="mt-3">
                <Link to="/" className="btn btn-secondary">Back to Welcome</Link>
            </div>
        </div>
    );
};

export default LoginPage;
