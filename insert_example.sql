-- Insert data into Users table 
INSERT INTO Users (username, password, email, creationDate) VALUES ('user1', 'password123', 'user1@example.com', '2024-08-28');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user2', 'password123', 'user2@example.com', '2024-08-22');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user3', 'password123', 'user3@example.com', '2024-08-26');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user4', 'password123', 'user4@example.com', '2024-09-23');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user5', 'password123', 'user5@example.com', '2024-08-09');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user6', 'password123', 'user6@example.com', '2024-09-16');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user7', 'password123', 'user7@example.com', '2024-09-14');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user8', 'password123', 'user8@example.com', '2024-09-16');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user9', 'password123', 'user9@example.com', '2024-08-15');
INSERT INTO Users (username, password, email, creationDate) VALUES ('user10', 'password123', 'user10@example.com', '2024-10-04');

-- Insert data into MealPlan table 
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 1', DATE '2024-10-20', DATE '2024-10-27');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 2', DATE '2024-11-08', DATE '2024-11-15');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 3', DATE '2024-11-01', DATE '2024-11-08');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 4', DATE '2024-11-01', DATE '2024-11-08');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 5', DATE '2024-11-03', DATE '2024-11-10');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 6', DATE '2024-10-19', DATE '2024-10-26');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 7', DATE '2024-11-06', DATE '2024-11-13');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 8', DATE '2024-11-06', DATE '2024-11-13');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 9', DATE '2024-11-01', DATE '2024-11-08');
INSERT INTO MealPlan (planName, startDate, endDate) VALUES ('Meal Plan 10', DATE '2024-11-10', DATE '2024-11-17');

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

-- Insert data into Contained table with different recipes for each plan
DO $$
DECLARE
    recipe_offset INTEGER;
BEGIN
    FOR i IN 1..10 LOOP
        recipe_offset := ((i - 1) * 5);
        INSERT INTO Contained(planID, recipeID)
        SELECT i AS plan_id,
               recipe_offset + r AS recipe_id
        FROM generate_series(1 ,5 ) AS r;
    END LOOP;
END $$;

-- Insert data into GroceryList table with specified listIDs
DO $$
BEGIN
    FOR i IN 1..10 LOOP
        INSERT INTO GroceryList(listName,date)
        VALUES('Grocery List'||i::TEXT,
               TO_DATE('202409'||LPAD((i+20)::TEXT ,2,'0'),'YYYYMMDD'));
    END LOOP;
END $$;

-- Insert data into Generates table to map each meal plan to a grocery list
DO $$
BEGIN
    FOR i IN 1..10 LOOP
        INSERT INTO Generates(planID,listID)
        SELECT i,i;
    END LOOP;
END $$;

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
        INSERT INTO Includes(ingredientID,listID)
        VALUES(rec.ingredientid ,rec.listid );
    END LOOP;
END $$;
