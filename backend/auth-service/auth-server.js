require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./route'); // Fix: Importing from route.js

// Init app
const app = express();

// Middleware
app.use(express.json()); // Ensure request body is parsed
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/user', authRoutes);

// Database connection
mongoose.connect(process.env.DB)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to database and listening on port ${process.env.PORT}`);
        });
    })
    .catch(error => console.log(error));
