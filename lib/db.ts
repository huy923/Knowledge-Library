import mysql from 'mysql2/promise'

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',     // default XAMPP username
  password: '',     // default XAMPP password is empty
  database: 'senselib', // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
