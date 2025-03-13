const User = require('./user');
const jwt = require('jsonwebtoken');

// Generate token function
const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1h' });
};

// Signup function (POST /user/new)
const signup = async (req, res) => {
    const { username, password, userLevel } = req.body;

    try {
        const userId = await User.signup(username, password, userLevel);

        // Create token
        const token = generateToken(userId);

        res.status(200).json({
            success: true,
            message: { username, token, _id: userId, userLevel }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Login function (POST /user/login)
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);

        // Fetch full user data to get userLevel
        const fullUser = await User.findOne({ _id: user.id });

        if (!fullUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Generate token
        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            message: {
                username: user.username,
                token,
                _id: user.id,
                userLevel: fullUser.userLevel // Include userLevel in the response
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Authenticate function (GET /user/auth-check)
const authenticate = async (req, res) => {
    const { authorization } = req.headers; // Use headers instead of params

    if (!authorization) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id }).select('_id userLevel'); // Also fetch userLevel

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Authenticated successfully',
            user: { _id: user._id, userLevel: user.userLevel }
        });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Request is not authorized' });
    }
};

module.exports = { signup, login, authenticate };
