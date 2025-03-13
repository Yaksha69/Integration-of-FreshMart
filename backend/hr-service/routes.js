const express = require('express');
const { registerHR, loginHR } = require('../controllers/hrController');

const router = express.Router();

router.post('/register', registerHR);
router.post('/login', loginHR);

module.exports = router;
