import * as dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();


const PG_URI = process.env.PG_URI;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

export default db;
