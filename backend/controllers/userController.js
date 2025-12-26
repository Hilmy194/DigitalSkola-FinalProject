const pool = require('../config/database');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
  try {
    // SECURE: Only return non-sensitive information
    const query = `SELECT id, username, role, created_at FROM users ORDER BY id`;
    const result = await pool.query(query);
    
    res.json({
      success: true,
      users: result.rows
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
};

// SECURE: Authorization check enforced by middleware
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // SECURE: Parameterized query prevents SQL injection
    const query = `SELECT id, username, email, role, created_at FROM users WHERE id = ?`;
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      res.json({
        success: true,
        user: result.rows[0]
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// SECURE: Authorization check enforced by middleware
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    let query;
    let params;

    if (password) {
      // SECURE: Hash password before storing
      const hashedPassword = await bcrypt.hash(password, 10);
      query = `UPDATE users SET email = ?, password = ? WHERE id = ? RETURNING id, username, email, role`;
      params = [email, hashedPassword, id];
    } else {
      query = `UPDATE users SET email = ? WHERE id = ? RETURNING id, username, email, role`;
      params = [email, id];
    }

    // SECURE: Parameterized query prevents SQL injection
    const result = await pool.query(query, params);

    if (result.rows && result.rows.length > 0) {
      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: result.rows[0]
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};
