const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SECURE: Using parameterized queries to prevent SQL injection
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // SECURE: Parameterized query prevents SQL injection
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await pool.query(query, [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      
      // SECURE: Using bcrypt to compare hashed passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // SECURE: Generate JWT token for authentication
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          success: true,
          message: 'Login successful',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          token: token
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
