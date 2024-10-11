-- Insert data into Users table 
INSERT INTO Users (username, password, email) VALUES ('user1', 'password123', 'user1@example.com');
INSERT INTO Users (username, password, email) VALUES ('user2', 'password123', 'user2@example.com');
INSERT INTO Users (username, password, email) VALUES ('user3', 'password123', 'user3@example.com');
INSERT INTO Users (username, password, email) VALUES ('user4', 'password123', 'user4@example.com');
INSERT INTO Users (username, password, email) VALUES ('user5', 'password123', 'user5@example.com');
INSERT INTO Users (username, password, email) VALUES ('user6', 'password123', 'user6@example.com');
INSERT INTO Users (username, password, email) VALUES ('user7', 'password123', 'user7@example.com');
INSERT INTO Users (username, password, email) VALUES ('user8', 'password123', 'user8@example.com');
INSERT INTO Users (username, password, email) VALUES ('user9', 'password123', 'user9@example.com');
INSERT INTO Users (username, password, email) VALUES ('user10', 'password123', 'user10@example.com');

-- Insert data into MealPlan table 
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 1', DATE '2024-09-30', DATE '2024-10-07');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 2', DATE '2024-10-07', DATE '2024-10-14');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 3', DATE '2024-10-14', DATE '2024-10-21');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 4', DATE '2024-10-21', DATE '2024-10-28');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 5', DATE '2024-10-28', DATE '2024-11-04');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 6', DATE '2024-11-04', DATE '2024-11-11');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 7', DATE '2024-11-11', DATE '2024-11-18');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 8', DATE '2024-11-18', DATE '2024-11-25');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 9', DATE '2024-11-25', DATE '2024-12-02');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 10', DATE '2024-12-02', DATE '2024-12-09');

-- Insert data into Creates table
INSERT INTO Creates (userID, planID) VALUES (1, 1);
INSERT INTO Creates (userID, planID) VALUES (2, 2);
INSERT INTO Creates (userID, planID) VALUES (3, 3);
INSERT INTO Creates (userID, planID) VALUES (4, 4);
INSERT INTO Creates (userID, planID) VALUES (5, 5);
INSERT INTO Creates (userID, planID) VALUES (6, 6);
INSERT INTO Creates (userID, planID) VALUES (7, 7);
INSERT INTO Creates (userID, planID) VALUES (8, 8);
INSERT INTO Creates (userID, planID) VALUES (9, 9);
INSERT INTO Creates (userID, planID) VALUES (10, 10);

-- Insert data into Contained table with 5 different recipes for each plan
DO $$
DECLARE
    recipe_offset INTEGER;
BEGIN
    FOR i IN 1..10 LOOP
        recipe_offset := ((i - 1) * 5);
        INSERT INTO Contained(planID, recipeID)
        SELECT i AS plan_id,
               recipe_offset + r AS recipe_id
        FROM generate_series(1, 5) AS r;
    END LOOP;
END $$;

-- Insert data into GroceryList table, weekly lists
INSERT INTO GroceryList (listID, listName, date) VALUES (1, 'Grocery List 1', DATE '2024-09-30');
INSERT INTO GroceryList (listID, listName, date) VALUES (2, 'Grocery List 2', DATE '2024-10-07');
INSERT INTO GroceryList (listID, listName, date) VALUES (3, 'Grocery List 3', DATE '2024-10-14');
INSERT INTO GroceryList (listID, listName, date) VALUES (4, 'Grocery List 4', DATE '2024-10-21');
INSERT INTO GroceryList (listID, listName, date) VALUES (5, 'Grocery List 5', DATE '2024-10-28');
INSERT INTO GroceryList (listID, listName, date) VALUES (6, 'Grocery List 6', DATE '2024-11-04');
INSERT INTO GroceryList (listID, listName, date) VALUES (7, 'Grocery List 7', DATE '2024-11-11');
INSERT INTO GroceryList (listID, listName, date) VALUES (8, 'Grocery List 8', DATE '2024-11-18');
INSERT INTO GroceryList (listID, listName, date) VALUES (9, 'Grocery List 9', DATE '2024-11-25');
INSERT INTO GroceryList (listID, listName, date) VALUES (10, 'Grocery List 10', DATE '2024-12-02');

-- Insert data into Generates table to map each meal plan to a grocery list
INSERT INTO Generates (planID, listID) VALUES (1, 1);
INSERT INTO Generates (planID, listID) VALUES (2, 2);
INSERT INTO Generates (planID, listID) VALUES (3, 3);
INSERT INTO Generates (planID, listID) VALUES (4, 4);
INSERT INTO Generates (planID, listID) VALUES (5, 5);
INSERT INTO Generates (planID, listID) VALUES (6, 6);
INSERT INTO Generates (planID, listID) VALUES (7, 7);
INSERT INTO Generates (planID, listID) VALUES (8, 8);
INSERT INTO Generates (planID, listID) VALUES (9, 9);
INSERT INTO Generates (planID, listID) VALUES (10, 10);

-- Insert data into Includes table with each grocery list containing all needed ingredients
DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN (
        SELECT DISTINCT g.listID,
                        m.ingredientID
        FROM Generates g
        JOIN Contained c ON g.planID = c.planID
        JOIN MadeOf m ON c.recipeID = m.recipeID
    ) LOOP
        INSERT INTO Includes(ingredientID, listID)
        VALUES(rec.ingredientid, rec.listid );
    END LOOP;
END $$;
