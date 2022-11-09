// import express from 'express';
// import {
// 	checkIfUserExists,
// 	confirmUser,
// 	constructSignedJWT,
// 	encryptPasswordAndSaveNewUser,
// 	verifyUserInput,
// } from '../controllers/authController.js';
// const router = express.Router();

// /* Get user input from the /signup route.
// Verify the user's input.
// Check to see if the user has already been created.
// Protect the user's password by encrypting it.
// Make a user account in database.
// Finally, construct a JWT token that is signed. */
// router.post(
// 	'/signup',
// 	verifyUserInput,
// 	checkIfUserExists,
// 	encryptPasswordAndSaveNewUser,
// 	constructSignedJWT,
// 	(req, res) => {
// 		return res.status(200).json(res.locals.newlyCreatedUser);
// 	}
// );

// /*
// Get user input for the /login route.
// Verify the user's input.
// Check to see if the user is genuine.
// Compare the user's password to the one we saved earlier in our database.
// Finally, construct a JWT token that is signed.
// */
// router.post('/login', verifyUserInput, confirmUser, (req, res) => {
// 	return res.status(200).json(res.locals.user);
// });

// export default router;
