const { Pool } = require('pg')
const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});
pool.connect()
  .then(() => console.log(`Connected to pg on port ${process.env.PGPORT}`))
  .catch(err => console.error('connection error', err.stack))
module.exports.pool = pool
