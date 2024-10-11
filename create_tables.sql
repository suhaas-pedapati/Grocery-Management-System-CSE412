CREATE TABLE Users (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MealPlan (
    planID SERIAL PRIMARY KEY,
    planName VARCHAR(1000),
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
    recipeName VARCHAR(1000)
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
    ingredientName VARCHAR(1000)
);

CREATE TABLE MadeOf (
    recipeID INTEGER,
    ingredientID INTEGER,
    PRIMARY KEY (recipeID, ingredientID),
    FOREIGN KEY (recipeID) REFERENCES Recipe(recipeID) ON DELETE CASCADE,
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID) ON DELETE CASCADE
);

CREATE TABLE GroceryList (
    listName VARCHAR(1000),
    listID SERIAL PRIMARY KEY,
    date DATE,
);

CREATE TABLE Generates (
    planID INTEGER,
    listID INTEGER,
    PRIMARY KEY (planID, listID),
    FOREIGN KEY (planID) REFERENCES MealPlan(planID) ON DELETE CASCADE,
    FOREIGN KEY (listID) REFERENCES GroceryList(listID) ON DELETE CASCADE
);

CREATE TABLE Includes (
    listID INTEGER,
    ingredientID INTEGER,
    PRIMARY KEY (ingredientID, listID),
    FOREIGN KEY (ingredientID) REFERENCES Ingredient(ingredientID) ON DELETE CASCADE,
    FOREIGN KEY (listID) REFERENCES GroceryList(listID) ON DELETE CASCADE
);
