// authRoutes.js
const express = require('express');
const { login } = require('../controllers/authController'); // Import the correct function
const router = express.Router();

router.post('/admin/login', login); // Use the `login` function as the callback

module.exports = router;
