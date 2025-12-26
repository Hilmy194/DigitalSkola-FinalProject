const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function setupDatabase() {
  try {
    // Connect to MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    console.log('Database connected successfully');

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        role VARCHAR(20) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    // Create posts table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Posts table created');

    // Hash passwords for all users
    const hilmyPass = await bcrypt.hash('hilmy123', 10);
    const andiPass = await bcrypt.hash('andi123', 10);
    const dikaPass = await bcrypt.hash('dika123', 10);
    const aliyaPass = await bcrypt.hash('aliya123', 10);
    const putriPass = await bcrypt.hash('putri123', 10);
    const rezaPass = await bcrypt.hash('reza123', 10);

    // Insert users with hashed passwords
    const users = [
      ['hilmy', hilmyPass, 'hilmy@forum.com', 'admin'],
      ['andi', andiPass, 'andi@example.com', 'user'],
      ['dika', dikaPass, 'dika@example.com', 'user'],
      ['aliya', aliyaPass, 'aliya@nyoba.com', 'user'],
      ['putri', putriPass, 'putri@contoh.com', 'user'],
      ['reza', rezaPass, 'reza@example.com', 'user']
    ];

    for (const user of users) {
      try {
        await connection.execute(
          'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)',
          user
        );
      } catch (err) {
        if (err.code !== 'ER_DUP_ENTRY') {
          console.error('Error inserting user:', err.message);
        }
      }
    }
    console.log('Sample users inserted');

    // Insert sample posts
    const posts = [
      ['Selamat Datang di Forum Aman', 'Forum ini sudah diamankan dari SQL Injection dan IDOR', 1],
      ['Tips Keamanan Web', 'Selalu gunakan parameterized queries dan validasi input', 1],
      ['Belajar Cybersecurity', 'Penting untuk memahami vulnerability sebelum mengamankannya', 2],
      ['Pengalaman Pertama', 'Ini adalah post pertama saya di forum ini', 3],
      ['Diskusi Teknologi', 'Mari diskusi tentang teknologi terbaru', 4],
      ['Sharing Knowledge', 'Berbagi ilmu adalah hal yang baik', 5],
      ['Project Baru', 'Sedang mengerjakan project keamanan web', 6]
    ];

    for (const post of posts) {
      try {
        await connection.execute(
          'INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)',
          post
        );
      } catch (err) {
        console.error('Error inserting post:', err.message);
      }
    }
    console.log('Sample posts inserted');

    await connection.end();
    
    console.log('\n✓ Database setup complete!');
    console.log('✓ All passwords are hashed with bcrypt');
    console.log('\nTest accounts:');
    console.log('- hilmy / hilmy123 (admin)');
    console.log('- andi / andi123');
      console.log('- dika / dika123');
      console.log('- aliya / aliya123');
      console.log('- putri / putri123');
      console.log('- reza / reza123');
    
  } catch (error) {
    console.error('Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
