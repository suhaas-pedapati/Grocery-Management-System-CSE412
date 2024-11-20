CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MealPlan (
    planID SERIAL PRIMARY KEY,
    userID INTEGER,
    planName VARCHAR(1000),
    startDate DATE,
    endDate DATE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

CREATE TABLE Recipe (
    recipeID SERIAL PRIMARY KEY,
    instructions TEXT NOT NULL,
    recipeName VARCHAR(1000)
);

CREATE TABLE Contained (
    planID INTEGER,
    recipeID INTEGER,
    PRIMARY KEY (planID, recipeID),
    FOREIGN KEY (planID) REFERENCES MealPlan(planID) ON DELETE CASCADE,
    FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID)
);

CREATE TABLE Ingredient (
    ingredientID SERIAL PRIMARY KEY,
    ingredientName VARCHAR(1000)
);

CREATE TABLE MadeOf (
    recipeID INTEGER,
    ingredientID INTEGER,
    PRIMARY KEY (recipeID, ingredientID),
    FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID),
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID)
);

CREATE TABLE GroceryList (
    listName VARCHAR(1000),
    listID SERIAL PRIMARY KEY,
    planID INTEGER,
    date DATE,
    FOREIGN KEY (planID) REFERENCES MealPlan(planID) ON DELETE CASCADE
);

CREATE TABLE Includes (
    listID INTEGER,
    ingredientID INTEGER,
    PRIMARY KEY (ingredientID, listID),
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID),
    FOREIGN KEY (listID) REFERENCES GroceryList(listID) ON DELETE CASCADE
);
