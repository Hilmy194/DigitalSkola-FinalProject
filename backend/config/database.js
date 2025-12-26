const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// SECURE: Parameterized queries prevent SQL injection
const query = async (sql, params = []) => {
  try {
    const [rows] = await pool.execute(sql, params);
    
    // For INSERT queries, return the inserted ID
    if (sql.trim().toUpperCase().startsWith('INSERT')) {
      return { rows: [{ id: rows.insertId }] };
    }
    
    // For UPDATE/DELETE, return affected rows count
    if (sql.trim().toUpperCase().startsWith('UPDATE') || sql.trim().toUpperCase().startsWith('DELETE')) {
      return { rows, rowCount: rows.affectedRows };
    }
    
    // For SELECT queries, return rows
    return { rows };
  } catch (error) {
    console.error('Database query error:', error.message);
    throw error;
  }
};

module.exports = { query, pool };
