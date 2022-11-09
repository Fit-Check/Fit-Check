const db = require('../models/clothingModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {};

// login controller
authController.verifyUserInput = (req, res, next) => {
  // retrieve inputed data from frontend
  const { username, password, email } = req.body;
  // query string, accesses sql db
  const queryString = `SELECT users.id, users.username FROM users WHERE users.username='${username}' AND user.password='${password}' AND users.email='${email}`;
  db.query(queryString)
    .then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .then((user) => {
      // if our query (user includes all info inputed for login) returns null, send back a false message to front end
      if (!user) return res.status(400).json(false);
      // otherwise return an object with the retrieved info from the db
      return res.status(200).json({ user_id: user.id, username: user.usernam });
    })
    .catch((err) => {
      // if any other error happens, send message to global handler
      return next({
        log: 'Error in authController.verifyUser',
        status: 400,
        message: { err: err },
      });
    });
};

// new user creator
authController.createUser = (req, res, next) => {
  const { firstname, lastname, username, password, email, location } = req.body;
  const queryString = `INSERT INTO users(username,firstname,lastname,password,email,location VALUES ('${username}', '${firstname}', '${lastname}', '${password}', '${email}', '${location}')`;
  db.query(queryString)
    .then(() => {
      return res.status(200).json(true);
    })
    .catch((err) => {
      return next({
        log: 'Error in authController.createUser',
        status: 400,
        message: { err: err },
      });
    });
};

// user deleter, no functionality in front end yet so come back for it
authController.deleteUser = (req, res, next) => {};

authController.encryptPasswordAndSaveNewUser = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await saveNewUser([
      firstname,
      lastname,
      username.toLowerCase(), //sanitize
      email.toLowerCase(), //sanitize,
      hashedPassword,
    ]);
    res.locals.newlyCreatedUser = newUser;
    return next();
  } catch (error) {
    console.log(error, 'encryptUserPassword');
  }
};

// export authController
module.exports = authController;

// authorization token created with jsonwebtoken
// export const constructSignedJWT = async (req, res, next) => {
//   try {
//     const savedUserInfo = res.locals.newlyCreatedUser;
//     const token = await jwt.sign(
//       {
//         id: savedUserInfo.id,
//         email: savedUserInfo.email,
//         username: savedUserInfo.username,
//       },
//       process.env.SECRET,
//       { expiresIn: '48h' }
//     );
//     delete savedUserInfo.password;
//     savedUserInfo.token = token;
//     res.locals.newlyCreatedUser = savedUserInfo;
//     return next();
//   } catch (error) {
//     console.log(error, 'constructSignedJWT');
//   }
// };

// export const confirmUser = async (req, res, next) => {
//   try {
//     // Get user input
//     const { email, username, password } = req.body;
//     // Validate user input
//     if (!((email || username) && password)) {
//       return next({
//         log: 'Error caught in confirmUser controller',
//         status: 400,
//         message: { err: 'All input fields are required.' },
//       });
//     }
//     // Validate if user exists in database
//     const user = username
//       ? await checkUserInDB([username])
//       : await checkUserInDB([email]);
// comapre passwords if user exists
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign(
//         {
//           id: user.id,
//           email: user.email,
//           username: user.username,
//         },
//         process.env.SECRET,
//         { expiresIn: '48h' }
//       );
//       delete user.password;
//       user.token = token;
//       res.locals.user = user;
//       console.log(res.locals.user, ' res.locals.user');
//       return next();
//     }
//     // if passwrod don't match
//     return next({
//       log: 'Error caught in confirmUser controller',
//       status: 400,
//       message: { err: 'Invalid credentials.' },
//     });
//   } catch (error) {
//     console.log(error, 'confirmUser');
//   }
// };
const db = require('../models/clothingModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {};

// login controller
authController.verifyUserInput = (req, res, next) => {
  // retrieve inputed data from frontend
  const { username, password, email } = req.body;
  // query string, accesses sql db
  const queryString = `SELECT users.id, users.username FROM users WHERE users.username='${username}' AND user.password='${password}' AND users.email='${email}`;
  db.query(queryString)
    .then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .then((user) => {
      // if our query (user includes all info inputed for login) returns null, send back a false message to front end
      if (!user) return res.status(400).json(false);
      // otherwise return an object with the retrieved info from the db
      return res.status(200).json({ user_id: user.id, username: user.username });
    })
    .catch((err) => {
      // if any other error happens, send message to global handler
      return next({
        log: 'Error in authController.verifyUser',
        status: 400,
        message: { err: err },
      });
    });
};

// new user creator
authController.createUser = (req, res, next) => {
  const { firstname, lastname, username, password, email, location } = req.body;
  const queryString = `INSERT INTO users(username,firstname,lastname,password,email,location VALUES ('${username}', '${firstname}', '${lastname}', '${password}', '${email}', '${location}')`;
  db.query(queryString)
    .then(() => {
      return res.status(200).json(true);
    })
    .catch((err) => {
      return next({
        log: 'Error in authController.createUser',
        status: 400,
        message: { err: err },
      });
    });
};

// user deleter, no functionality in front end yet so come back for it
authController.deleteUser = (req, res, next) => {};

authController.encryptPasswordAndSaveNewUser = async (req, res, next) => {
  // try {
  //   const { firstname, lastname, username, email, password } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const newUser = await saveNewUser([
  //     firstname,
  //     lastname,
  //     username.toLowerCase(), //sanitize
  //     email.toLowerCase(), //sanitize,
  //     hashedPassword,
  //   ]);
  //   res.locals.newlyCreatedUser = newUser;
  //   return next();
  // } catch (error) {
  //   console.log(error, 'encryptUserPassword');
  // }
};

// export authController
module.exports = authController;

// authorization token created with jsonwebtoken
// export const constructSignedJWT = async (req, res, next) => {
//   try {
//     const savedUserInfo = res.locals.newlyCreatedUser;
//     const token = await jwt.sign(
//       {
//         id: savedUserInfo.id,
//         email: savedUserInfo.email,
//         username: savedUserInfo.username,
//       },
//       process.env.SECRET,
//       { expiresIn: '48h' }
//     );
//     delete savedUserInfo.password;
//     savedUserInfo.token = token;
//     res.locals.newlyCreatedUser = savedUserInfo;
//     return next();
//   } catch (error) {
//     console.log(error, 'constructSignedJWT');
//   }
// };

// export const confirmUser = async (req, res, next) => {
//   try {
//     // Get user input
//     const { email, username, password } = req.body;
//     // Validate user input
//     if (!((email || username) && password)) {
//       return next({
//         log: 'Error caught in confirmUser controller',
//         status: 400,
//         message: { err: 'All input fields are required.' },
//       });
//     }
//     // Validate if user exists in database
//     const user = username
//       ? await checkUserInDB([username])
//       : await checkUserInDB([email]);
// comapre passwords if user exists
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign(
//         {
//           id: user.id,
//           email: user.email,
//           username: user.username,
//         },
//         process.env.SECRET,
//         { expiresIn: '48h' }
//       );
//       delete user.password;
//       user.token = token;
//       res.locals.user = user;
//       console.log(res.locals.user, ' res.locals.user');
//       return next();
//     }
//     // if passwrod don't match
//     return next({
//       log: 'Error caught in confirmUser controller',
//       status: 400,
//       message: { err: 'Invalid credentials.' },
//     });
//   } catch (error) {
//     console.log(error, 'confirmUser');
//   }
// };
