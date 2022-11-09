<<<<<<< HEAD
// import * as dotenv from 'dotenv';
// import pkg from 'pg';
// const { Pool } = pkg;

// dotenv.config();


// const PG_URI = process.env.PG_URI;

// // create a new pool here using the connection string above
// const pool = new Pool({
//   connectionString: PG_URI,
// });

// const db = {
//   query: (text, params, callback) => {
//     return pool.query(text, params, callback);
//   },
// };

// export default db;
=======
const { Pool, client } = require('pg');


const PG_URI = 'postgres://ymzwhjnh:yaoh_kjWhYOGVgvuzNX5MdH9BY5ieX0K@otto.db.elephantsql.com/ymzwhjnh';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// this export is an object with a value of query
// this is our connection to the sql db, use in any query call in controllers
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
>>>>>>> dev
