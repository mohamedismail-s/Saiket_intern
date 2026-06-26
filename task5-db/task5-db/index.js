// Task 5 - Database Integration
// Mohamed Ismail | SaiKet Systems Internship
// connecting the REST API to MySQL database

const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// middleware to parse JSON
app.use(express.json());

// ── DATABASE CONNECTION ──
// change the password to your MySQL root password
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // put your MySQL password here
  database: 'saiket_task5'
});

// connect to database
db.connect(function(err) {
  if (err) {
    console.log('Database connection failed!');
    console.log('Error: ' + err.message);
    console.log('Make sure MySQL is running and password is correct');
    return;
  }
  console.log('Connected to MySQL database successfully!');
});

// ── ROUTES ──

// GET / - welcome message
app.get('/', function(req, res) {
  res.json({
    message: 'Task 5 - User API with MySQL Database',
    endpoints: {
      'GET /users':        'get all users',
      'GET /users/:id':    'get one user',
      'POST /users':       'create user',
      'PUT /users/:id':    'update user',
      'DELETE /users/:id': 'delete user'
    }
  });
});

// GET /users - get all users from database
app.get('/users', function(req, res) {
  var sql = 'SELECT * FROM users';

  db.query(sql, function(err, results) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + err.message
      });
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  });
});

// GET /users/:id - get single user
app.get('/users/:id', function(req, res) {
  var sql = 'SELECT * FROM users WHERE id = ?';
  var id = req.params.id;

  db.query(sql, [id], function(err, results) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + err.message
      });
    }

    // check if user exists
    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No user found with id ' + id
      });
    }

    res.json({
      success: true,
      data: results[0]
    });
  });
});

// POST /users - create new user
app.post('/users', function(req, res) {
  var name  = req.body.name;
  var email = req.body.email;
  var age   = req.body.age;

  // basic validation
  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email and age'
    });
  }

  var sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';

  db.query(sql, [name, email, age], function(err, result) {
    if (err) {
      // duplicate email error
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({
          success: false,
          message: 'This email already exists'
        });
      }
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + err.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: result.insertId,
        name: name,
        email: email,
        age: age
      }
    });
  });
});

// PUT /users/:id - update user (all fields)
app.put('/users/:id', function(req, res) {
  var id    = req.params.id;
  var name  = req.body.name;
  var email = req.body.email;
  var age   = req.body.age;

  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email and age'
    });
  }

  var sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';

  db.query(sql, [name, email, age, id], function(err, result) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + err.message
      });
    }

    // check if user was found
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'No user found with id ' + id
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: { id: parseInt(id), name, email, age }
    });
  });
});

// DELETE /users/:id - delete user
app.delete('/users/:id', function(req, res) {
  var id = req.params.id;
  var sql = 'DELETE FROM users WHERE id = ?';

  db.query(sql, [id], function(err, result) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Database error: ' + err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'No user found with id ' + id
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  });
});

// start server
app.listen(PORT, function() {
  console.log('Server running on http://localhost:' + PORT);
});
