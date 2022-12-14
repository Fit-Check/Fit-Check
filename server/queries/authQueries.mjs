import db from '../models/clothingModels.mjs';

export const checkUserInDB = async (queryInfo) => {
  try {
    const foundUser = await db.query(
      'SELECT * FROM users WHERE username=$1',
      queryInfo
    );
    return foundUser.rows[0];
  } catch (error) {
    console.log(error, 'checkUserInDB');
  }
};

export const saveNewUser = async (queryInfo) => {
  try {
    const savedUser = await db.query(
      'INSERT INTO users(firstname, lastname, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      queryInfo
    );
    return savedUser.rows[0];
  } catch (error) {
    console.log(error, 'saveNewUser');
  }
};
