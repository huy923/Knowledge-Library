import mysql from 'mysql2/promise'

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // default XAMPP password is empty
  database: 'document_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool 