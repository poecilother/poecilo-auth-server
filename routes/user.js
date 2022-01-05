const express = require('express');
const router = express.Router();

// controllers
const register = require('../controllers/user/register');
// middlewares
const registerValidation = require('../middlewares/user/validation/registerValidation');

// router.post('/login', login);
router.post('/register', registerValidation, register);

module.exports = router;
