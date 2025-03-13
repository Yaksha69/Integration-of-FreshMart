const express = require('express');
const axios = require('axios');

const router = express.Router();

// Forward HR login request to HR service
router.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.HR_SERVICE}/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Error forwarding request to HR service'
        });
    }
});

module.exports = router;
