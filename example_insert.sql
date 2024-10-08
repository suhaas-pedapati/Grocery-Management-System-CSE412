-- Example Data
-- Delete or Change If Needed
-- Just to test that the tables are working
INSERT INTO Users (username, password, email) VALUES
('john_doe', 'password123', 'john@example.com'),
('jane_smith', 'password456', 'jane@example.com');


INSERT INTO MealPlan (name, startDate, endDate) VALUES
('Weekly Meal Plan', '2024-10-10', '2024-10-16'),
('Healthy Eating Plan', '2024-10-17', '2024-10-23');

INSERT INTO Creates (userID, planID) VALUES
(1, 1),
(2, 2);

INSERT INTO Recipe (name, instructions, servingSize) VALUES
('Spaghetti Bolognese', 'Cook spaghetti, add sauce, serve.', 4),
('Caesar Salad', 'Mix ingredients, serve chilled.', 2);

INSERT INTO Contained (planID, recipeID) VALUES
(1, 1),
(1, 2);

INSERT INTO Ingredient (name, unit) VALUES
('Spaghetti', 'grams'),
('Ground Beef', 'grams'),
('Lettuce', 'grams'),
('Caesar Dressing', 'ml');

INSERT INTO MadeOf (recipeID, ingredientID) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 4);

INSERT INTO GroceryItem (name, price) VALUES
('Spaghetti Noodles', 1.99),
('Beef Mince', 5.99),
('Lettuce', 0.99),
('Salad Dressing', 2.49);

INSERT INTO Matches (ingredientID, itemID) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

INSERT INTO GroceryList (date, totalPrice) VALUES
('2024-10-10', 7.98),
('2024-10-17', 3.48);

INSERT INTO Generates (planID, listID) VALUES
(1, 1),
(2, 2);

INSERT INTO Includes (itemID, listID) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2);