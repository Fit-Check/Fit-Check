import {
  getAllClothes,
  getWeatherClothes,
  saveNewClothes,
} from '../queries/clothingQueries.js';

const clothingController = {};

// get all clothes
///:userID
clothingController.getAllClothes = async (req, res, next) => {
  console.log('Get all clothes middleware');

  const { userID } = req.params;
  try {
    if (!userID) {
      return next({
        log: 'Error caught in getAllClothes middleware',
        status: 400,
        message: { err: 'Incomplete params on request url.' },
      });
    }
    console.log(userID, req.user.id, 'comparing ids');
    if (userID == req.user.id) {
      res.locals.allClothes = await getAllClothes([userID]);
      return next();
    } else {
      return next({
        log: 'Error caught in getAllClothes middleware',
        status: 400,
        message: { err: 'Params on request url and id on token do not match.' },
      });
    }
    //pass the userID into the query function
    //query function will return the results
  } catch (error) {
    return next({
      log: 'Error caught in GET query request',
      status: 400,
      message: { err: 'Error occurred sending GET request to the database.' },
    });
  }
};

// get specific clothes
///:weather/:userID
clothingController.getClothesForWeather = async (req, res, next) => {
  console.log('Trying to get appropriate clothes for the weather!');
  try {
    //check if weather and userID params are available
    const { userID, weather } = req.params;
    console.log(weather);
    //if not available, invoke error handler
    if (!userID || !weather) {
      return next({
        log: 'Error caught in getClothesForWeather middleware',
        status: 400,
        message: { err: 'Incomplete params on request url.' },
      });
    }
    if (userID == req.user.id) {
      let feelTemp;
      if (weather >= 80) feelTemp = 'hot';
      if (weather <= 79 && weather >= 68) feelTemp = 'perfect';
      if (weather <= 67 && weather >= 47) feelTemp = 'cool';
      if (weather <= 46) feelTemp = 'cold';
      // if available, make query to database with those info
      const clothes = await getWeatherClothes([userID, feelTemp]);
      // save to locals
      res.locals.weatherClothes = clothes;
      // return next
      return next();
    } else {
      return next({
        log: 'Error caught in getAllClothes middleware',
        status: 400,
        message: { err: 'Params on request url and id on token do not match.' },
      });
    }
  } catch (error) {
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
    const { userID } = req.params;
    const { name, weather, clothingType } = req.body;
    console.log(req.body.name);
    console.log(name, weather, clothingType);
    if (!userID) {
      return next({
        log: 'Error caught in saveNewClothes middleware',
        status: 400,
        message: { err: 'Params not found on request url.' },
      });
    } else if (!name || !weather || !clothingType) {
      return next({
        log: 'Error caught in saveNewClothes middleware',
        status: 400,
        message: { err: 'Incomplete body properties on request url.' },
      });
    }
    const clothes = await saveNewClothes([userID, name, weather, clothingType]);
    // save to locals
    res.locals.savedClothes = clothes.rows;
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
