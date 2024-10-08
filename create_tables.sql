CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MealPlan (
    planID SERIAL PRIMARY KEY,
    name VARCHAR(100),
    startDate DATE,
    endDate DATE
);

CREATE TABLE Creates (
    userID INTEGER,
    planID INTEGER,
    PRIMARY KEY (userID, planID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE,
    FOREIGN KEY (planID) REFERENCES MealPlan(planID) ON DELETE CASCADE
);

CREATE TABLE Recipe (
    recipeID SERIAL PRIMARY KEY,
    instructions TEXT NOT NULL,
    name VARCHAR(100),
    servingSize INTEGER
);

CREATE TABLE Contained (
    planID INTEGER,
    recipeID INTEGER,
    PRIMARY KEY (planID, recipeID),
    FOREIGN KEY (planID) REFERENCES MealPlan(planID) ON DELETE CASCADE,
    FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID) ON DELETE CASCADE
);

CREATE TABLE Ingredient (
    ingredientID SERIAL PRIMARY KEY,
    name VARCHAR(100),
    unit VARCHAR(50)
);

CREATE TABLE MadeOf (
    recipeID INTEGER,
    ingredientID INTEGER,
    PRIMARY KEY (recipeID, ingredientID),
    FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID) ON DELETE CASCADE,
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID) ON DELETE CASCADE
);

CREATE TABLE GroceryItem (
    itemID SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10, 2)
);

CREATE TABLE Matches (
    ingredientID INTEGER,
    itemID INTEGER,
    PRIMARY KEY (ingredientID, itemID),
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID) ON DELETE CASCADE,
    FOREIGN KEY (itemID) REFERENCES GroceryItem(itemID) ON DELETE CASCADE
);

CREATE TABLE GroceryList (
    listID SERIAL PRIMARY KEY,
    date DATE,
    totalPrice DECIMAL(10, 2)
);

CREATE TABLE Generates (
    planID INTEGER,
    listID INTEGER,
    PRIMARY KEY (planID, listID),
    FOREIGN KEY (planID) REFERENCES MealPlan(planID) ON DELETE CASCADE,
    FOREIGN KEY (listID) REFERENCES GroceryList(listID) ON DELETE CASCADE
);

CREATE TABLE Includes (
    itemID INTEGER,
    listID INTEGER,
    PRIMARY KEY (itemID, listID),
    FOREIGN KEY (itemID) REFERENCES GroceryItem(itemID) ON DELETE CASCADE,
    FOREIGN KEY (listID) REFERENCES GroceryList(listID) ON DELETE CASCADE
);