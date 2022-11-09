// import express from 'express';
// import clothingController from '../controllers/clothingController.js';
// const router = express.Router();

// //getting all clothes for the full closet view
// router.get('/:userID', clothingController.getAllClothes, (req, res) => {
//   return res.status(200).json(res.locals.allClothes);
// });

// // get specific user clothes
// router.get(
//   '/:weather/:userID',
//   clothingController.getClothesForWeather,
//   (req, res) => {
//     return res.status(200).json(res.locals.weatherClothes);
//   }
// );

// // save user's new clothes
// router.post('/:userID', clothingController.saveNewClothes, (req, res) => {
//   return res.status(200).json(res.locals.savedClothes);
// });

// export default router;

// // {
// //     name:
// //     weather: //sunny, rainy, hot, cold
// //     clothingType: //top or bottom
// // }
