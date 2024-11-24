import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const HomePage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="center-content">
            <h1>Welcome to Meal Planner</h1>
            <div className="button-container">
                <button onClick={goToLogin}>Login</button>
                <button onClick={goToRegister}>Register</button>
            </div>
        </div>
    );
};

export default HomePage;