const pool = require('../config/database');

// SECURE: Using parameterized queries to prevent SQL injection
exports.getAllPosts = async (req, res) => {
  try {
    const query = `
      SELECT p.*, u.username 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query);
    
    res.json({
      success: true,
      posts: result.rows
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts'
    });
  }
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    // SECURE: Parameterized query prevents SQL injection
    const query = `INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)`;
    const result = await pool.query(query, [title, content, userId]);

    res.json({
      success: true,
      message: 'Post created successfully',
      postId: result.rows[0].id
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create post'
    });
  }
};

// SECURE: Search using parameterized queries with LIKE operator
exports.searchPosts = async (req, res) => {
  const { keyword } = req.query;

  try {
    // SECURE: Parameterized query with proper escaping
    const query = `
      SELECT p.*, u.username 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.title LIKE ? OR p.content LIKE ?
      ORDER BY p.created_at DESC
    `;
    const searchTerm = `%${keyword}%`;
    const result = await pool.query(query, [searchTerm, searchTerm]);

    res.json({
      success: true,
      posts: result.rows
    });
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed'
    });
  }
};
