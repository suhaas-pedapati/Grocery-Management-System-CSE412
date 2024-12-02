import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import mealplannedLogo from './mealplanned.png';

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
            <img 
                src={mealplannedLogo}
                alt="MealPlanned Logo" 
                className="mealplanned-logo" 
            />
            <h1>Welcome!</h1>
            <p>CSE 412 - Fall 2024 (Tushar Tyagi, Mathm Alkaabi, Suhaas Pedapati, Prabhat Krishna Kommineni)<br></br><br></br>
            Hello There! With MealPlanned, we're trying to solve the issues of planning out meals for busy lives like yours.<br></br><br></br>
            Once you register yourself with us, you're directed to our list of an innumerable set of recipes out of which you're free to hand-pick your favorites! Once you select all meals you desire, we make cooking easier for you by providing you with recipes to them and also grocery shopping easier for you by simply generating a list of grocery items you'll be needing to buy for them! Simplifying the process of doing "the math" behind meal planning, and making your lives a little less busier and in fact, more organized. We hope you'll have a good experience here! Thank you for joining us!</p>
            <div className="button-container">
                <button onClick={goToLogin}>Login Page</button>                
                <button onClick={goToRegister}>Register Now!</button>
            </div>
        </div>
    );
};

export default HomePage;
