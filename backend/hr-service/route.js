const express = require('express');
const { loginHR } = require('./controller');

const router = express.Router();

router.post('/login', loginHR);

module.exports = router;

