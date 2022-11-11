
const express = require('express');
const authController = require('../controllers/authController.js');
const router = express.Router();


// user creater route, only need to direct the req from front end to the
// controller

// router.get('/signup', authController.createUser, authController.constructSignedJWT, authController.encryptPasswordAndSaveNewUser , (req,res) => {
//   console.log('router auth working for signup');
//   res.send(200).json('this works');
// });

// router.get('/login', authController.verifyUserInput, , , (req,res) => {
//   res.send(200).json('this works');
// });

router.post('/signup', authController.encryptPassword, authController.createUser, (req,res) => {
  console.log('signup response', res.locals);
  res.send(200).json();
});

router.post('/home', authController.verifyUserInput, authController.confirmUser, authController.constructSignedJWT,(req, res) => {
  res.sendStatus(200).json();
});

// put delete user route in the future

module.exports = router;
