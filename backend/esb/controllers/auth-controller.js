const axios = require('axios');

const login = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE}/user/login`, req.body, {
            headers: { "Content-Type": "application/json" }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Error forwarding request to Auth Service'
        });
    }
};

const signup = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE}/user/new`, req.body, {
            headers: { "Content-Type": "application/json" }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            success: false,
            message: error.response?.data?.message || 'Error forwarding request to Auth Service'
        });
    }
};

module.exports = { login, signup };
