const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // PostgreSQL connection pool

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if the user already exists
        const userExists = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const newUser = await pool.query(
            "INSERT INTO Users (username, password, email) VALUES ($1, $2, $3) RETURNING *",
            [username, hashedPassword, email]
        );

        // Create a JWT token for the user
        const token = jwt.sign({ userID: newUser.rows[0].userid }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token and user details including userID
        res.json({ 
            token, 
            user: { 
                username: newUser.rows[0].username, 
                email: newUser.rows[0].email,
                userID: newUser.rows[0].userid  // Include userID in response
            } 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Login an existing user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Create a JWT token for the authenticated user
        const token = jwt.sign({ userID: user.rows[0].userid }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token and user details including userID
        res.json({ 
            token, 
            user: { 
                username: user.rows[0].username, 
                email: user.rows[0].email,
                userID: user.rows[0].userid  // Include userID in response
            } 
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;