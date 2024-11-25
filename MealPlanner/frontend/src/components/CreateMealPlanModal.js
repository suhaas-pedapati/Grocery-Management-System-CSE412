import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const CreateMealPlanModal = ({ isOpen, onClose, onMealPlanCreated }) => {
    const [mealPlanName, setMealPlanName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]); // Filtered recipes based on search
    const [selectedRecipes, setSelectedRecipes] = useState([]); // Recipes added by user

    // Fetch available recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/recipes'); // Adjust endpoint
                setRecipes(response.data || []); // Ensure recipes is always an array
            } catch (err) {
                console.error(err);
                setRecipes([]); // Set recipes to an empty array if there's an error
            }
        };

        fetchRecipes();
    }, []);

    // Filter recipes based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredRecipes([]); // Show no results when search query is empty
        } else {
            setFilteredRecipes(
                recipes.filter((recipe) =>
                    recipe.recipename &&
                    recipe.recipename.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, recipes]);

    // Add a recipe to the selected list
    const handleAddRecipe = (recipe) => {
        if (!selectedRecipes.some((r) => r.recipeid === recipe.recipeid)) {
            setSelectedRecipes([...selectedRecipes, recipe]);
        }
    };

    // Remove a recipe from the selected list
    const handleRemoveRecipe = (recipeID) => {
        setSelectedRecipes(selectedRecipes.filter((recipe) => recipe.recipeid !== recipeID));
    };

    const handleCreateMealPlan = async () => {
        try {
            // Get user ID from localStorage
            const userID = localStorage.getItem('userID');

            // Send data to backend
            const response = await axios.post('http://localhost:4000/mealplans/mealplans', {
                userID,
                name: mealPlanName,
                startDate,
                endDate,
                recipes: selectedRecipes.map((recipe) => recipe.recipeid),
            });

            console.log('Meal Plan Created:', response.data);

            // Notify parent component
            onMealPlanCreated();

            // Close modal
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
    <div className="modal-overlay">
        <div className="modal-content">
            <h2>Create New Meal Plan</h2>
            
            {/* Meal Plan Name */}
            <div className="meal-plan-name-container">
                <label>
                    Meal Plan Name:
                </label>
                <input 
                    type="text" 
                    value={mealPlanName} 
                    onChange={(e) => setMealPlanName(e.target.value)} 
                    placeholder="Enter meal plan name" 
                />
            </div>

            {/* Start Date and End Date */}
            <div className="date-container">
                <label>
                    Start Date:
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                    />
                </label>

                <label>
                    End Date:
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                </label>
            </div>

            {/* Search Recipes and Buttons */}
            <div className="search-recipes-container">
                <label>
                    Search Recipes:
                    <div className="search-dropdown-container">
                        <input 
                            type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            placeholder="Search recipes..." 
                        />
                        
                        {/* Filtered Recipe Results in Dropdown */}
                        {filteredRecipes.length > 0 && (
                            <div className="dropdown-recipes-list">
                                {filteredRecipes.map((recipe) => (
                                    <div
                                        key={recipe.recipeid}
                                        className="dropdown-recipe-item"
                                        onClick={() => handleAddRecipe(recipe)}
                                    >
                                        {recipe.recipename}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </label>

                {/* Done and Cancel Buttons */}
                <div className="buttons-container">
                    <button onClick={handleCreateMealPlan}>Done</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>

            {/* Selected Recipes */}
            {selectedRecipes.length > 0 && (
                <div className="selected-recipes-container">
                    <h3>Selected Recipes:</h3>
                    <ul className="selected-recipes-list">
                        {selectedRecipes.map((recipe) => (
                            <li key={recipe.recipeid}>
                                {recipe.recipename}
                                <button onClick={() => handleRemoveRecipe(recipe.recipeid)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
);
};

export default CreateMealPlanModal;