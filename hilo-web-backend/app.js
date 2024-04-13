// backend/app.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'final_eng_ess';

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    
    // Sign-in route
    app.post('/signin', async (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const usersCollection = db.collection('users');
        await usersCollection.insertOne({ username, password: hashedPassword });
        res.send('Signed in successfully');
    });

    // Login route
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ username });
        if (!user) {
            res.send('User not found');
        } else {
            const match = await bcrypt.compare(password, user.password); // Compare hashed password
            if (match) {
                res.send('Logged in successfully');
            } else {
                res.send('Incorrect password');
            }
        }
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`Backend server is running on port ${PORT}`);
    });
});
