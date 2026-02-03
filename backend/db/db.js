const { Pool } = require("pg");
const {drizzle}=require('drizzle-orm/node-postgres')
const pool = new Pool({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: process.env.DB_PORT,
  connectionString: process.env.DB_URL,
});

const db=drizzle(pool)

module.exports = { db };
