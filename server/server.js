const express = require('express');
const path = require('path');
// routers
// const clothingRouter = require('./routes/clothingRoutes.js');
// const authRouter = require('./routes/authRoutes.js');
// controllers
// const authController = require('./routes/authController.js');
// const clothingController = require ('./controllers/clothingController.js');
// middleware
// const auth = require('./middleware/auth.js');
// const { modes } = require('react-transition-group/SwitchTransition.js');

// import { fileURLToPath } from 'url';
// The fileURLToPath method returns the fully-resolved, platform-specific
// Node.js file path.

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// if we are using cookies later
// app.use(cookieParser());

// app.use('/clothes', auth, clothingRouter);
// app.use('/', authRouter);

// app.use('authController', authController);
// app.use('clothingController', clothingController);
// app.use('auth', auth);

// statically serve everything in the build folder on the route '/build'
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// serve index.html on the route '/'
// app.get('/', cookieController.setCookie, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/index.html'));
// });

//This is working 
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

//This is working
app.get('/signup', (req, res) => {
  res.send(200).json('This is signup route');
});

app.get('/login', (req, res) => {
  res.sendStatus(200).json('This is login route');
});

// route handler POST request to /signup
// create a verifyUser controller, cookieController, sessionController
app.post(
  '/signup',
  // authController.createUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    // what should happen here on successful sign up?
    // if post is successful redirect to /secret
    res.sendStatus(200).redirect('/home');
  }
);

// create a verifyUser controller, cookieController, sessionController
app.post(
  '/login',
  // authController.verifyUser,
  // cookieController.setSSIDCookie,
  // sessionController.startSession,
  (req, res) => {
    console.log('successful login, redirecting');
    res.redirect('/home');
  }
);

// Authorized routes
// app.get('/home', sessionController.isLoggedIn, (req, res) => {
//   res.sendFile(path.resolve(__dirname, '/home'));
// });

// app.get(
//   '/home/users',
//   sessionController.isLoggedIn,
//   authController.getAllUsers,
//   (req, res) => {
//     res.send({ users: res.locals.users });
//   }
// );

// 404 handler
app.use('*', (req, res) => {
  res.sendStatus(404).send('Not Found');
});


// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  console.log(err, 'error from global error handler');
  const errorObj = Object.assign({}, defaultError, err);
  return res.sendStatus(errorObj.status).json(errorObj.message);
});

app.listen(3000 || process.env.PORT); //listens on port 3000 -> http://localhost:3000/

module.exports = app; 