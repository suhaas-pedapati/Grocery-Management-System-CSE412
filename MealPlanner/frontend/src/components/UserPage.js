import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateMealPlanModal from './CreateMealPlanModal'; // Import modal component
import '../App.css';

const UserPage = () => {
    const navigate = useNavigate();

    // Get username and userID from localStorage
    const username = localStorage.getItem('username');
    const userID = localStorage.getItem('userID');

    const [mealPlans, setMealPlans] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch meal plans when component mounts
    useEffect(() => {
        if (!userID) {
            console.error("No user ID found. Redirecting to login.");
            navigate('/login');
            return;
        }

        const fetchMealPlans = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/mealplans/user/${userID}`);
                setMealPlans(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMealPlans();
    }, [userID, navigate]);

    return (
        <div className="user-page">
            {/* Logout Button */}
            <div className="logout-button-container">
                <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
            </div>

            <h1>Welcome, {username}</h1>

            {/* Create New Meal Plan Button */}
            <button className="create-mealplan-button" onClick={() => setIsModalOpen(true)}>
                + New Meal Plan
            </button>

            <h2>Your Meal Plans</h2>

            {/* List of Meal Plans */}
            <div className="mealplan-container">
                {mealPlans.map((plan) => (
                    <div 
                        key={plan.planid} 
                        className="mealplan-item"
                        onClick={() =>
                            navigate(`/mealplan/${plan.planid}`, {
                                state: { 
                                    name: plan.planname,
                                    startDate: plan.startdate,
                                    endDate: plan.enddate
                                }
                            })
                        }
                    >
                        <strong>{plan.planname}</strong> 
                        <p>({new Date(plan.startdate).toLocaleDateString()} - {new Date(plan.enddate).toLocaleDateString()})</p>
                    </div>
                ))}
            </div>

            {/* Modal for Creating Meal Plans */}
            <CreateMealPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onMealPlanCreated={() => window.location.reload()} // Refresh page after creation
            />
        </div>
    );
};

export default UserPage;