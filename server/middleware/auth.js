// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//   try {
//     const token =
//       req.body.token ||
//       req.query.token ||
//       req.headers.authorization.split(' ')[1];
//     console.log(token, 'is token seen?');
//     if (!token) {
//       return next({
//         log: 'Error caught in verifyToken middleware',
//         status: 403,
//         message: { err: 'A token is required for authentication.' },
//       });
//     }
//     const decodedToken = jwt.verify(token, process.env.SECRET);
//     req.user = decodedToken;
//     return next();
//   } catch (error) {
//     console.log(error, 'verifyToken middleware');
//     return next({
//       log: 'Error caught in verifyToken middleware',
//       status: 400,
//       message: { err: 'Invalid token.' },
//     });
//   }
// };

// export default verifyToken;
