const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, 'secure_forum.db');

const db = new sqlite3.Database(dbPath, async (err) => {
  if (err) {
    console.error('Error creating database:', err);
    return;
  }

  console.log('Creating secure database...');

  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, async (err) => {
    if (err) {
      console.error('Error creating users table:', err);
      return;
    }

    // Create posts table
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        user_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `, async (err) => {
      if (err) {
        console.error('Error creating posts table:', err);
        return;
      }

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

      const insertUser = db.prepare('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)');
      
      for (const user of users) {
        insertUser.run(user, (err) => {
          if (err) console.error('Error inserting user:', err);
        });
      }
      
      insertUser.finalize();

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

      const insertPost = db.prepare('INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)');
      
      for (const post of posts) {
        insertPost.run(post, (err) => {
          if (err) console.error('Error inserting post:', err);
        });
      }
      
      insertPost.finalize();

      console.log('✓ Database setup complete!');
      console.log('✓ All passwords are hashed with bcrypt');
      console.log('\nTest accounts:');
      console.log('- hilmy / hilmy123 (admin)');
      console.log('- andi / andi123');
      console.log('- dika / dika123');
      console.log('- aliya / aliya123');
      console.log('- putri / putri123');
      console.log('- reza / reza123');

      db.close();
    });
  });
});
