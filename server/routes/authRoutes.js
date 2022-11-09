const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

// user creater route, only need to direct the req from front end to the controller
router.post('/signup', authController.createUser);

// user login route
router.post('/login', authController.verifyUserInput);

// put delete user route in the future

module.exports = router;
