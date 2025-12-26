const jwt = require('jsonwebtoken');

// SECURE: JWT middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// SECURE: Authorization middleware to check resource ownership
const authorizeUser = (req, res, next) => {
  const requestedUserId = parseInt(req.params.id);
  const authenticatedUserId = req.user.id;

  // Only allow users to access their own resources
  if (requestedUserId !== authenticatedUserId) {
    return res.status(403).json({
      success: false,
      message: 'Access denied: You can only access your own profile'
    });
  }

  next();
};

module.exports = { authenticateToken, authorizeUser };
