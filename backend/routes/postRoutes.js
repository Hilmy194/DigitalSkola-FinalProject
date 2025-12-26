const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticateToken } = require('../middleware/auth');

// SECURE: All routes require authentication
router.get('/posts', authenticateToken, postController.getAllPosts);
router.post('/posts', authenticateToken, postController.createPost);
router.get('/posts/search', authenticateToken, postController.searchPosts);

module.exports = router;
