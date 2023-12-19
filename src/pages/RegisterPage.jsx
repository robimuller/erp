// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'; // Import custom CSS for animations

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Example: Min 8 characters, at least 1 letter and 1 number

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (!passwordRegex.test(password)) {
            setError('Password must be at least 8 characters long and contain both letters and numbers.');
            return false;
        }
        return true;
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message

        if (!validateForm()) {
            return; // Stop the registration process if validation fails
        }

        try {
            const user = await registerUser(email, password);
            console.log('Registered user:', user);
            navigate('/dashboard'); // Redirect to the dashboard after registration
        } catch (error) {
            setError(error.message); // Display Firebase error message
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleRegister} className={error ? 'shake-animation' : ''} key={error ? 'hasError' : 'noError'}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <div className="mt-3">
                <Link to="/login" className="text-decoration-none">Already have an account? Sign in</Link>
            </div>
            <div className="mt-3">
                <Link to="/" className="btn btn-secondary">Back to Welcome</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
