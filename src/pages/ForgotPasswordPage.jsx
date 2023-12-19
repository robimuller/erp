// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { sendResetPasswordEmail } from '../services/authService';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await sendResetPasswordEmail(email);
            setMessage('Password reset email sent. Check your inbox.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setMessage('Failed to send password reset email. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Send Reset Email</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
            <div className="mt-3">
                <Link to="/login" className="btn btn-secondary">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
