
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

// user creater route, only need to direct the req from front end to the controller
// router.post('/signup', authController.createUser);

router.post('/signup', authController.createUser, (req, res) => {
  res.sendStatus(200);

});

// user login route
// router.post('/login', authController.verifyUserInput);

router.post('/home', authController.verifyUserInput, (req, res) => {
  res.sendStatus(200);
});

// put delete user route in the future

module.exports = router;
