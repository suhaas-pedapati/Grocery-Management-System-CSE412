const express = require('express');
const pool = require('../db'); // PostgreSQL connection pool
const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await pool.query('SELECT recipeID, recipeName, instructions FROM Recipe');
        res.json(recipes.rows); // Send the list of recipes to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;