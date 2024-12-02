import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MealPlanDetails = () => {
    const { planID } = useParams(); // Get planID from URL parameters
    const location = useLocation(); // Access state passed via navigation
    const navigate = useNavigate();

    // Extract meal plan name and dates from location state
    const { name, startDate, endDate } = location.state || {};

    const [mealPlanDetails, setMealPlanDetails] = useState(null);

    // Fetch meal plan details when component mounts
    useEffect(() => {
        const fetchMealPlanDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/mealplans/${planID}/details`);
                setMealPlanDetails(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMealPlanDetails();
    }, [planID]);

    // Function to delete the meal plan
    const handleDeleteMealPlan = async () => {
        try {
            await axios.delete(`http://localhost:4000/mealplans/mealplans/${planID}`);
            alert('Meal Plan completed and deleted successfully.');
            navigate('/user'); // Redirect to user page after deletion
        } catch (err) {
            console.error(err);
            alert('Failed to delete meal plan.');
        }
    };

    if (!mealPlanDetails) {
        return <p style={{ color: 'white', textAlign: 'center' }}>Loading...</p>;
    }

    const { recipes, groceryList } = mealPlanDetails;

    return (
        <div style={{ color: 'white', backgroundColor: 'black', padding: '20px', textAlign: 'center' }}>
            {/* Back and Complete Buttons */}
            <div style={{ maxWidth: '80%', margin: '0 auto', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                    style={{
                        backgroundColor: '#555555',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: 'none',
                    }}
                    onClick={() => navigate('/user')}
                >
                    Back to Main Page
                </button>

                <button
                    style={{
                        backgroundColor: '#d9534f',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: 'none',
                    }}
                    onClick={handleDeleteMealPlan}
                >
                    Complete & Delete
                </button>
            </div>

            {/* Meal Plan Name and Dates */}
            <div style={{ maxWidth: '80%', margin: '0 auto' }}>
                <h1 style={{ color: 'white' }}>Meal Plan Name: {name}</h1>
                <p style={{ color: 'white' }}>Dates: {`(${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()})`}</p>
            </div>

            {/* Recipes Table */}
            <div style={{ maxWidth: '80%', margin: '20px auto' }}>
                <h2 style={{ color: '#f57c00', marginBottom: '20px' }}>Your Dishes & Recipes:</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                    <thead>
                        <tr>
                            <th style={{ color: '#f57c00', textAlign: 'left', padding: '10px', borderBottom: '1px solid #555' }}>
                                Dish
                            </th>
                            <th style={{ color: '#f57c00', textAlign: 'left', padding: '10px', borderBottom: '1px solid #555' }}>
                                Cooking Instructions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map((recipe, index) => (
                            <tr key={index}>
                                <td style={{ padding: '10px', borderBottom: '1px solid #555' }}>{recipe.recipename}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #555' }}>{recipe.instructions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Grocery List */}
            <div style={{ maxWidth: '80%', margin: '20px auto' }}>
                <h2 style={{ color: '#f57c00', marginBottom: '20px' }}>Your Grocery List:</h2>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '10px',
                    }}
                >
                    {groceryList.ingredients.map((ingredient, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: '#1e1e1e',
                                color: 'white',
                                padding: '10px 15px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                            }}
                        >
                            {ingredient}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MealPlanDetails;
