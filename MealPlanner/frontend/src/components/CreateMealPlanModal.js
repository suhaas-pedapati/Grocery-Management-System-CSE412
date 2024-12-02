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
            const userID = localStorage.getItem('userID');

            const response = await axios.post('http://localhost:4000/mealplans/mealplans', {
                userID,
                name: mealPlanName,
                startDate,
                endDate,
                recipes: selectedRecipes.map((recipe) => recipe.recipeid),
            });

            console.log('Meal Plan Created:', response.data);
            onMealPlanCreated();
            onClose();
        } catch (err) {
            console.error(err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div
                className="modal-content"
                style={{
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    padding: '20px',
                    borderRadius: '12px',
                    backgroundColor: '#fff',
                    width: '80%',
                    margin: '0 auto',
                }}
            >
                <h2>Let's create a New Meal Plan!</h2>

                <div className="meal-plan-name-container">
                    <label>Meal Plan Name:</label>
                    <input
                        type="text"
                        value={mealPlanName}
                        onChange={(e) => setMealPlanName(e.target.value)}
                        placeholder="Enter Meal Plan Name..."
                    />
                </div>
                <br />

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
                <br />

                <div className="search-recipes-container">
                    <label>
                        Search For Your Recipes:
                        <div className="search-dropdown-container">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Through Our Recipes..."
                            />
                            {filteredRecipes.length > 0 && (
                                <div
                                    className="dropdown-recipes-list"
                                    style={{
                                        maxHeight: '200px',
                                        overflowY: 'auto',
                                        backgroundColor: '#f4f4f9',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                    }}
                                >
                                    {filteredRecipes.map((recipe) => (
                                        <div
                                            key={recipe.recipeid}
                                            className="dropdown-recipe-item"
                                            style={{ padding: '10px', cursor: 'pointer' }}
                                            onClick={() => handleAddRecipe(recipe)}
                                        >
                                            {recipe.recipename}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                    <br />
                    <div className="buttons-container">
                        <button onClick={handleCreateMealPlan}>Done</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>

                {selectedRecipes.length > 0 && (
                    <div className="selected-recipes-container">
                        <h3>Selected Recipes:</h3>
                        <ul
                            className="selected-recipes-list"
                            style={{
                                maxHeight: '200px',
                                overflowY: 'auto',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                            }}
                        >
                            {selectedRecipes.map((recipe) => (
                                <li key={recipe.recipeid} style={{ marginBottom: '10px' }}>
                                    {recipe.recipename}
                                    <button
                                        style={{
                                            marginLeft: '10px',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleRemoveRecipe(recipe.recipeid)}
                                    >
                                        Remove
                                    </button>
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
