import db from '../models/clothingModels.mjs';
import {sortClothes} from '../helper/sortClothes.mjs';



const getAllClothes = async (queryInfo) => {
  try {
    const clothes = await db.query('SELECT * FROM clothes WHERE clothes.user_id=$1', queryInfo);
    const sortedClothes = sortClothes(clothes.rows);
    return sortedClothes;
  } catch(error) {
    console.log(error);
  }
};

const getWeatherClothes = async (queryInfo) => {
  try{
    const clothes = await db.query('SELECT * FROM clothes WHERE user_id=$1 AND weather=$2', queryInfo);
    const sortedClothes = sortClothes(clothes.rows);
    return sortedClothes;
  } catch (error) {
    console.log(error, 'error in getWeatherClothes under queries');
  }
};

const saveNewClothes = async (queryInfo) => {
  try {
    const savedClothe = await db.query('INSERT INTO clothes (user_id, name, weather, type) VALUES ($1, $2, $3, $4) RETURNING *', queryInfo);
    return savedClothe;
  } catch (error) {
    console.log(error, 'error in getWeatherClothes under queries');
  }
};

export { getAllClothes, getWeatherClothes, saveNewClothes };