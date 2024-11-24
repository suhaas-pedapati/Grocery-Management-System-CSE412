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
                const response = await axios.get(`http://localhost:5000/mealplans/${planID}/details`);
                setMealPlanDetails(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMealPlanDetails();
    }, [planID]);

    if (!mealPlanDetails) {
        return <p>Loading...</p>;
    }

    const { recipes, groceryList } = mealPlanDetails;

    return (
        <div className="meal-plan-details">
            {/* Back Button */}
            <button className="back-button" onClick={() => navigate('/user')}>Back</button>

            {/* Meal Plan Name and Dates */}
            <h1>{name}</h1>
            <p style={{ textAlign: 'center' }}>{`(${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()})`}</p>

            <div className="details-container">
                {/* Recipes Table */}
                <div className="recipe-container">
                    <h2>Recipes</h2>
                    <table className="recipe-table">
                        <thead>
                            <tr>
                                <th>Recipe Name</th>
                                <th>Instructions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipes.map((recipe, index) => (
                                <tr key={index}>
                                    <td>{recipe.recipename}</td>
                                    <td>{recipe.instructions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Grocery List Table */}
                <div className="grocery-list-container">
                    <h2>{groceryList.name}</h2> 
                    <table className="grocery-table">
                        <thead>
                            <tr>
                                <th>Ingredients</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groceryList.ingredients.map((ingredient, index) => (
                                <tr key={index}>
                                    <td>{ingredient}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MealPlanDetails;