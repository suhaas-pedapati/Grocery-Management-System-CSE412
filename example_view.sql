--CREATE VIEW FullMealPlanView AS
SELECT 
    u.userID,
    u.username,
    mp.planID,
    mp.planName,
    mp.startDate,
    mp.endDate,
    gl.listID,
    gl.listName,
    gl.date AS groceryListDate,
    r.recipeID,
    r.recipeName,
	i.ingredientID,
    i.ingredientName,
    r.instructions
FROM 
    Users u
JOIN 
    Creates c ON u.userID = c.userID
JOIN 
    MealPlan mp ON c.planID = mp.planID
JOIN 
    Generates g ON mp.planID = g.planID
JOIN 
    GroceryList gl ON g.listID = gl.listID
JOIN 
    Contained ct ON mp.planID = ct.planID
JOIN 
    Recipe r ON ct.recipeID = r.recipeID
JOIN 
    MadeOf mo ON r.recipeID = mo.recipeID
JOIN 
    Ingredient i ON mo.ingredientID = i.ingredientID;