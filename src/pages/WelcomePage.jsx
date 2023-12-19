// src/pages/WelcomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div className="container text-center">
            <h1 className="my-4">Welcome to the ERP System</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="d-grid gap-2">
                        <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
                        <Link to="/register" className="btn btn-secondary btn-lg">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
