const router = require('express').Router();
const pool = require('../db');

// Get all meal plans for a specific user
router.get('/user/:userID', async (req, res) => {
    try {
        const { userID } = req.params;
        //console.log("BackUserID: " + userID);
        
        const mealPlans = await pool.query(
            `SELECT planID, planName, startDate, endDate 
             FROM MealPlan 
             WHERE userID = $1`, 
            [userID]
        );
        
        res.json(mealPlans.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get detailed meal plan data (recipes + grocery list)
router.get('/:planID/details', async (req, res) => {
    try {
        const { planID } = req.params;

        // Fetch recipes for the meal plan
        const recipes = await pool.query(
            `SELECT r.recipeName, r.instructions 
             FROM Recipe r 
             JOIN Contained c ON r.recipeID = c.recipeID 
             WHERE c.planID = $1`,
            [planID]
        );

        // Fetch grocery list name and ingredients for the meal plan
        const groceryList = await pool.query(
            `SELECT gl.listName, i.ingredientName 
             FROM GroceryList gl 
             JOIN Includes inc ON gl.listID = inc.listID 
             JOIN Ingredient i ON inc.ingredientID = i.ingredientID 
             WHERE gl.planID = $1`,
            [planID]
        );

        res.json({
            recipes: recipes.rows,
            groceryList: {
                name: groceryList.rows.length > 0 ? groceryList.rows[0].listname : "No Grocery List",
                ingredients: groceryList.rows.map((row) => row.ingredientname)
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Create a new meal plan
router.post('/mealplans', async (req, res) => {
    try {
        const { userID, name, startDate, endDate, recipes } = req.body;

        // Insert into MealPlan table with userID
        const newMealPlan = await pool.query(
            `INSERT INTO MealPlan (planName, startDate, endDate, userID) VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, startDate, endDate, userID]
        );

        const mealPlanID = newMealPlan.rows[0].planid;

        // Insert into Contained table (linking meal plans and recipes)
        for (const recipeID of recipes) {
            await pool.query(
                `INSERT INTO Contained (planID, recipeID) VALUES ($1, $2)`,
                [mealPlanID, recipeID]
            );
        }

        // Generate grocery list and populate Includes table
        const groceryList = await pool.query(
            `INSERT INTO GroceryList (listName, date, planID) VALUES ($1, $2, $3) RETURNING *`,
            [`${name} - Grocery List`, startDate, mealPlanID]
        );

        const groceryListID = groceryList.rows[0].listid;

        // Fetch ingredients for selected recipes and populate Includes table
        const ingredientsResult = await pool.query(
            `SELECT DISTINCT i.ingredientID FROM MadeOf mo
             JOIN Ingredient i ON mo.ingredientID = i.ingredientID
             WHERE mo.recipeID = ANY($1::int[])`,
             [recipes]
         );

         for (const ingredient of ingredientsResult.rows) {
             await pool.query(
                 `INSERT INTO Includes (listID, ingredientID) VALUES ($1, $2)`,
                 [groceryListID, ingredient.ingredientid]
             );
         }

         res.json({ success: true });
     } catch (err) {
         console.error(err.message);
         res.status(500).send("Server error");
     }
});

// Delete a meal plan
router.delete('/mealplans/:planID', async (req, res) => {
    try {
        const { planID } = req.params;

        // Delete from MealPlan table
        await pool.query('DELETE FROM MealPlan WHERE planID = $1', [planID]);
        
        res.json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;