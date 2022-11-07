import express from 'express';
import path from 'path';
import clothingRouter from './routes/clothingRoutes.mjs';
import authRouter from './routes/authRoutes.mjs';
import auth from './middleware/auth.mjs';
import { fileURLToPath } from 'url';
// The fileURLToPath method returns the fully-resolved, platform-specific Node.js file path.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/clothes', auth, clothingRouter);

// statically serve everything in the build folder on the route '/build'
app.use('/dist', express.static(path.join(__dirname, '../dist')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
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

app.listen(3000); //listens on port 3000 -> http://localhost:3000/
