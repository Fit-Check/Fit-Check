const express = require('express');
const app = express();
const path = require('path');
const clothingRouter = require('./routes/clothingRoutes');
const authRouter = require('./routes/authRoutes');
// const auth = './middleware/auth.mjs';






// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/clothes', clothingRouter);
app.use('/', authRouter);

// statically serve everything in the build folder on the route '/build'
app.use(express.static(path.join(__dirname, '../dist')));

// 404 handlers
app.use('/*', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'));
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
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000 || process.env.PORT, console.log('express is connected')); //listens on port 3000 -> http://localhost:3000/
