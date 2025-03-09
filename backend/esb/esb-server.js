require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS

// Services
const productServices = require('./routes/inventory-route');
const posServices = require('./routes/pos-routes');
const authService = require('./routes/auth-routes');
const employeeServices = require('./routes/employee-routes');
const hrService = require('./routes/hr-route'); // Add HR route

// Request mapper
const mapper = '/api/v1';

// Init app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use(`${mapper}/inventory`, productServices);
app.use(`${mapper}/pos`, posServices);
app.use(`${mapper}/auth`, authService);
app.use(`${mapper}/employee`, employeeServices);
app.use(`${mapper}/hr`, hrService); // Add HR service to ESB

// If no request matches
app.use((req, res) => {
    res.status(404).json({ error: 'No such endpoint exists' });
});

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
