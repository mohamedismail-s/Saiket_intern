// Task 6 - Full Stack Application (Backend)
// Mohamed Ismail | SaiKet Systems Internship
// Node.js + Express + MySQL + CORS

const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');

const app  = express();
const PORT = 5000;

// middlewares
app.use(cors()); // allow frontend to talk to backend
app.use(express.json());

// ── DATABASE CONNECTION ──
const db = mysql.createConnection({
  host:     'localhost',
  user:     'root',
  password: '', // put your MySQL password here
  database: 'saiket_task6'
});

db.connect(function(err) {
  if (err) {
    console.log('DB connection failed: ' + err.message);
    return;
  }
  console.log('MySQL connected successfully!');

  // create table if not exists on startup
  var createTable = `
    CREATE TABLE IF NOT EXISTS users (
      id         INT AUTO_INCREMENT PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      email      VARCHAR(100) NOT NULL UNIQUE,
      age        INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(createTable, function(err) {
    if (err) console.log('Table creation error: ' + err.message);
    else console.log('Users table ready!');
  });
});

// ── API ROUTES ──

// GET all users
app.get('/api/users', function(req, res) {
  db.query('SELECT * FROM users ORDER BY id DESC', function(err, results) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
});

// GET single user
app.get('/api/users/:id', function(req, res) {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], function(err, results) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (results.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: results[0] });
  });
});

// POST create user
app.post('/api/users', function(req, res) {
  var name  = req.body.name;
  var email = req.body.email;
  var age   = req.body.age;

  if (!name || !email || !age) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  db.query('INSERT INTO users (name, email, age) VALUES (?, ?, ?)', [name, email, age], function(err, result) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ success: false, message: 'Email already exists' });
      return res.status(500).json({ success: false, message: err.message });
    }
    res.status(201).json({
      success: true,
      message: 'User created!',
      data: { id: result.insertId, name, email, age }
    });
  });
});

// PUT update user
app.put('/api/users/:id', function(req, res) {
  var name  = req.body.name;
  var email = req.body.email;
  var age   = req.body.age;
  var id    = req.params.id;

  if (!name || !email || !age) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  db.query('UPDATE users SET name=?, email=?, age=? WHERE id=?', [name, email, age, id], function(err, result) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User updated!', data: { id: parseInt(id), name, email, age } });
  });
});

// DELETE user
app.delete('/api/users/:id', function(req, res) {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], function(err, result) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted!' });
  });
});

app.listen(PORT, function() {
  console.log('Backend running on http://localhost:' + PORT);
  console.log('Frontend file open panni test pannunga!');
});
