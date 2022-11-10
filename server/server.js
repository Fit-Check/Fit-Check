const express = require('express');
const app = express();
const path = require('path');
// const authController = require('./controllers/authController');
// const cors = require('cors');
// const clothingRouter = require('./routes/clothingRoutes');
const authRouter = require('./routes/authRoutes');

// handle parsing request body
// app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/clothes', clothingRouter);
app.use('/', authRouter);

// statically serve everything in the build folder on the route '/build'
// app.use(express.static(path.join(__dirname, '../dist')));

/* handle requests for static files */
app.use('/assets', express.static(path.resolve(__dirname, './client')));

// app.get('/', (req,res) => {
//   return res.sendStatus(200).json('this is root');
// });

app.get('/', (req, res) => {
	// console.log('got the index.html');
	return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

// app.get('/signup', authController.createUser, (req,res) => {
//   return res.sendStatus(200).json('this is GET to signup');
// });
// app.get('/login', (req,res) => {
//   return res.sendStatus(200).json('this is GET to login');
// });
// app.post('/signup',authController.createUser, (req,res) => {
//   res.sendStatus(200).json('this is login');
// });
// app.post('/login', (req,res) => {
//   res.sendStatus(200).json('this is login');
// });

// 404 handlers
app.use('/*', (req, res) => {
	return res
		.status(200)
		.sendFile(path.resolve(__dirname, '../dist/index.html'));
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
