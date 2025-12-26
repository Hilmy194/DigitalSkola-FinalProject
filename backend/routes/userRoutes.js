const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeUser } = require('../middleware/auth');

// SECURE: Authentication required for all routes
router.get('/users', authenticateToken, userController.getAllUsers);

// SECURE: Authorization check - users can only access their own profile
router.get('/users/:id', authenticateToken, authorizeUser, userController.getUserById);
router.put('/users/:id', authenticateToken, authorizeUser, userController.updateUser);

module.exports = router;
