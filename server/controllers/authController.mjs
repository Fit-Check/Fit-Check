import { checkUserInDB, saveNewUser } from '../queries/authQueries.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const verifyUserInput = (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    if (req.route.path === '/signup') {
      if (!(firstname && lastname && username && email && password)) {
        return next({
          log: 'Error caught in verifyUserInput controller',
          status: 400,
          message: { err: 'All input fields are required.' },
        });
      }
    }
    if (req.route.path === '/login') {
      if (!((username || email) && password)) {
        return next({
          log: 'Error caught in verifyUserInput controller',
          status: 400,
          message: { err: 'All input fields are required.' },
        });
      }
    }
    return next();
  } catch (error) {
    console.log(error, 'verifyUserInput');
  }
};

export const checkIfUserExists = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const user = username
      ? await checkUserInDB([username])
      : await checkUserInDB([email]);

    if (user) {
      req.route.path === '/signup'
        ? next({
          log: 'Error caught in checkIfUserExists controller',
          status: 400,
          message: { err: 'Username or email has already been registered.' },
        })
        : (res.locals.user = user);
    }
    return next();
  } catch (error) {
    console.log(error, 'verifyUserInput');
  }
};

export const encryptPasswordAndSaveNewUser = async (req, res, next) => {
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

// authorization token created with jsonwebtoken
export const constructSignedJWT = async (req, res, next) => {
  try {
    const savedUserInfo = res.locals.newlyCreatedUser;
    const token = await jwt.sign(
      {
        id: savedUserInfo.id,
        email: savedUserInfo.email,
        username: savedUserInfo.username,
      },
      process.env.SECRET,
      { expiresIn: '48h' }
    );
    delete savedUserInfo.password;
    savedUserInfo.token = token;
    res.locals.newlyCreatedUser = savedUserInfo;
    return next();
  } catch (error) {
    console.log(error, 'constructSignedJWT');
  }
};

export const confirmUser = async (req, res, next) => {
  try {
    // Get user input
    const { email, username, password } = req.body;

    // Validate user input
    if (!((email || username) && password)) {
      return next({
        log: 'Error caught in confirmUser controller',
        status: 400,
        message: { err: 'All input fields are required.' },
      });
    }
    // Validate if user exists in database
    const user = username
      ? await checkUserInDB([username])
      : await checkUserInDB([email]);
    // comapre passwords if user exists
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.SECRET,
        { expiresIn: '48h' }
      );
      delete user.password;
      user.token = token;
      res.locals.user = user;
      return next();
    }
    // if passwrod don't match
    return next({
      log: 'Error caught in confirmUser controller',
      status: 400,
      message: { err: 'Invalid credentials.' },
    });
  } catch (error) {
    console.log(error, 'confirmUser');
  }
};
