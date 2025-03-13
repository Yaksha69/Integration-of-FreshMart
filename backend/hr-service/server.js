require('dotenv').config();
const express = require('express');

const hrRoutes = require('./route');

const app = express();
app.use(express.json());

app.use('/hr', hrRoutes);

app.listen(process.env.PORT, () => {
    console.log(`HR Service running on port ${process.env.PORT}`);
});
