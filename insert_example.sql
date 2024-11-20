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
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 1', DATE '2024-09-30', DATE '2024-10-07', 1);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 2', DATE '2024-10-07', DATE '2024-10-14', 2);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 3', DATE '2024-10-14', DATE '2024-10-21', 3);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 4', DATE '2024-10-21', DATE '2024-10-28', 4);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 5', DATE '2024-10-28', DATE '2024-11-04', 5);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 6', DATE '2024-11-04', DATE '2024-11-11', 6);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 7', DATE '2024-11-11', DATE '2024-11-18', 7);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 8', DATE '2024-11-18', DATE '2024-11-25', 8);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 9', DATE '2024-11-25', DATE '2024-12-02', 9);
INSERT INTO MealPlan (planName, startDate, endDate, userID)
VALUES ('Meal Plan 10', DATE '2024-12-02', DATE '2024-12-09', 10);


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
       FROM generate_series(1 ,5 ) AS r;
   END LOOP;
END $$;

-- Insert data into GroceryList table, weekly lists
INSERT INTO GroceryList (listName,date ,planid )VALUES('Grocery List1' ,DATE'20240930',1 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List2' ,DATE'20241007',2 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List3' ,DATE'20241014',3 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List4' ,DATE'20241021',4 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List5' ,DATE'20241028',5 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List6' ,DATE'20241104',6 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List7' ,DATE'20241111',7 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List8' ,DATE'20241118',8 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List9' ,DATE'20241125',9 );
INSERT INTO GroceryList(listName,date ,planid )VALUES('Grocery List10',DATE'20241202',10 );

-- Insert data into Includes table with each grocery list containing all needed ingredients
DO $$
DECLARE
   rec RECORD;
BEGIN
   FOR rec IN (
       SELECT DISTINCT gl.listid ,
                       mo.ingredientid 
       FROM GroceryList gl 
       JOIN Contained c ON gl.planid = c.planid 
       JOIN MadeOf mo ON c.recipeid = mo.recipeid 
   ) LOOP
       INSERT INTO Includes(ingredientid,listid )
       VALUES(rec.ingredientid ,rec.listid );
   END LOOP;
END $$;
