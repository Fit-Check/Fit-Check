
const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();

// user creater route, only need to direct the req from front end to the
// controller

router.get('/signup', authController.createUser, (req,res) => {
  res.send(200).json('this works');
});

router.get('/login', authController.createUser, (req,res) => {
  res.send(200).json('this works');
});

router.post('/signup', authController.createUser, (req,res) => {
  res.send(200).json('this works');
});

// user login route
router.post('/login', authController.verifyUserInput);

// put delete user route in the future

module.exports = router;
