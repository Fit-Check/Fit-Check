import {getAllClothes, getWeatherClothes, saveNewClothes} from '../queries/clothingQueries.mjs';

const clothingController = {};

// get all clothes
///:userID
clothingController.getAllClothes = async (req, res, next) => {
  console.log('Get all clothes middleware');
    
  const { userID } = req.params;
  try {
    if(!userID) {
      return next({
        log: 'Error caught in getAllClothes middleware',
        status: 400,
        message: { err: 'Incomplete params on request url.' },
      });
    } else {
      //pass the userID into the query function
      //query function will return the results
      res.locals.allClothes = await getAllClothes([userID]);
      return next();
    }
  } catch (error) {
    return next({
      log: 'Error caught in GET query request',
      status: 400,
      message: { err: 'Error occurred sending GET request to the database.' },
    });
  }

};

// get specific cloth
///:weather/:userID
clothingController.getClothesForWeather  = async (req, res, next) => {
  try{
    //check if weather and userID params are available
    const {userID, weather } = req.params;
    //if not available, invoke error handler
    if (!userID || !weather) {
      return next({
        log: 'Error caught in getClothesForWeather middleware',
        status: 400,
        message: { err: 'Incomplete params on request url.' },
      });
    }
    // if available, make query to database with those info
    const clothes = await getWeatherClothes([userID, weather]);
    // save to locals 
    res.locals.weatherClothes = clothes;
    // return next
    return next();
  }catch(error) {
    console.log(error, 'error in getWeatherClothes under controllers');
    //invoke global error handler
    return next({
      log: 'Error caught in getClothesForWeather middleware',
      status: 500,
      message: { err: 'Server Error.' },
    });
  }
};

// save new clothes
clothingController.saveNewClothes = async (req, res, next) => {
  // check if all body property expected exists
  // if not, invoke global error handler
  // else save new clothes
  try {
    const {userID} = req.params;
    const {name, weather, clothingType } = req.body;
    console.log(req.body.name)
    console.log(name, weather, clothingType)
    if (!userID) {
      return next({
        log: 'Error caught in saveNewClothes middleware',
        status: 400,
        message: { err: 'Params not found on request url.' },
      });
    }
    else if (!name || !weather || !clothingType) {
      return next({
        log: 'Error caught in saveNewClothes middleware',
        status: 400,
        message: { err: 'Incomplete body properties on request url.' },
      });
    }
    const clothe = await saveNewClothes([userID, name, weather, clothingType]);
    // save to locals 
    res.locals.savedClothe = clothe.rows;
    // return next
    return next();
  } catch (error) {
    console.log(error, 'error in saveNewClothes under controllers');
    return next({
      log: 'Error caught in saveNewClothes middleware',
      status: 500,
      message: { err: 'Server Error.' },
    });
  }
};

export default clothingController;

// {
//     name:
//     weather: //sunny, rainy, hot, cold
//     clothingType: //top or bottom
// }