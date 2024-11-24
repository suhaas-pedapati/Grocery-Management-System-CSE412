const express = require('express');
const cors = require('cors');
const pool = require('./db'); // PostgreSQL connection pool

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use('/auth', require('./routes/auth')); // Authentication routes
app.use('/mealplans', require('./routes/mealplans')); // Meal plans routes
app.use('/recipes', require('./routes/recipes')); // Recipes routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});