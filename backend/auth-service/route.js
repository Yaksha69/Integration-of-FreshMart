const express = require('express');
const { login, signup, authenticate } = require('./controller'); // Fix: Using controller.js

const router = express.Router();

router.post('/new', signup);
router.post('/login', login);
router.get('/auth-check', authenticate); // Fix: Removed `:authorization` param

module.exports = router;
