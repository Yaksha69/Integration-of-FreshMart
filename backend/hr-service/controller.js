const jwt = require('jsonwebtoken');
const axios = require('axios');

// Generate JWT Token
const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1h' });
};

// HR Login - Only if user exists in auth-service & userLevel is "hr"
const loginHR = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verify user in auth-service
        const authResponse = await axios.post(`${process.env.AUTH_SERVICE_URL}/user/login`, { username, password });

        // Check if userLevel is "hr"
        if (authResponse.data.message.userLevel !== 'hr') {
            return res.status(403).json({ success: false, message: 'Unauthorized: Not an HR account' });
        }

        // Generate HR service token
        const token = generateToken(authResponse.data.message._id);

        res.status(200).json({
            success: true,
            message: { username, token, _id: authResponse.data.message._id }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.response?.data?.message || 'Error logging in HR' });
    }
};

module.exports = { loginHR };

