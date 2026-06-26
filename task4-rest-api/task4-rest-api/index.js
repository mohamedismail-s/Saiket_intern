// Task 4 - Build a Basic REST API
// Mohamed Ismail | SaiKet Systems Internship
// using Node.js + Express

const express = require('express');
const app = express();
const PORT = 3000;

// middleware to parse JSON body
app.use(express.json());

// in-memory storage (no database yet, that's task 5)
// storing users as an array for now
let users = [
  { id: 1, name: 'Mohamed Ismail', email: 'ismail@example.com', age: 21 },
  { id: 2, name: 'Yogesh Nimankar', email: 'yogesh@example.com', age: 28 },
  { id: 3, name: 'Rahul Kumar',     email: 'rahul@example.com',  age: 24 },
];

// keep track of id counter
let nextId = 4;

// ── helper function to find user by id ──
function findUser(id) {
  return users.find(u => u.id === parseInt(id));
}

// ── ROUTES ──

// GET / - just a welcome message to check if server is running
app.get('/', (req, res) => {
  res.json({
    message: 'User Management REST API is running!',
    endpoints: {
      'GET /users':          'get all users',
      'GET /users/:id':      'get one user by id',
      'POST /users':         'create a new user',
      'PUT /users/:id':      'update a user fully',
      'PATCH /users/:id':    'update a user partially',
      'DELETE /users/:id':   'delete a user',
    }
  });
});

// GET /users - get all users
app.get('/users', (req, res) => {
  // returning all users
  res.json({
    success: true,
    count: users.length,
    data: users
  });
});

// GET /users/:id - get single user
app.get('/users/:id', (req, res) => {
  var user = findUser(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found with id ' + req.params.id
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// POST /users - create a new user
app.post('/users', (req, res) => {
  var { name, email, age } = req.body;

  // basic validation
  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email and age'
    });
  }

  // check if email already exists
  var emailExists = users.find(u => u.email === email);
  if (emailExists) {
    return res.status(400).json({
      success: false,
      message: 'A user with this email already exists'
    });
  }

  // validate age is a number
  if (isNaN(age) || age <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Age must be a valid positive number'
    });
  }

  var newUser = {
    id: nextId,
    name: name,
    email: email,
    age: parseInt(age)
  };

  users.push(newUser);
  nextId++;

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// PUT /users/:id - update a user (all fields)
app.put('/users/:id', (req, res) => {
  var user = findUser(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found with id ' + req.params.id
    });
  }

  var { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({
      success: false,
      message: 'For PUT, please provide all fields: name, email, age'
    });
  }

  // update in place
  user.name  = name;
  user.email = email;
  user.age   = parseInt(age);

  res.json({
    success: true,
    message: 'User updated successfully',
    data: user
  });
});

// PATCH /users/:id - partial update (only the fields sent)
app.patch('/users/:id', (req, res) => {
  var user = findUser(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found with id ' + req.params.id
    });
  }

  // only update fields that were actually sent
  if (req.body.name)  user.name  = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.age)   user.age   = parseInt(req.body.age);

  res.json({
    success: true,
    message: 'User partially updated',
    data: user
  });
});

// DELETE /users/:id - delete a user
app.delete('/users/:id', (req, res) => {
  var user = findUser(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found with id ' + req.params.id
    });
  }

  // remove from array
  users = users.filter(u => u.id !== parseInt(req.params.id));

  res.json({
    success: true,
    message: 'User deleted successfully',
    data: user
  });
});

// start the server
app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
  console.log('Test it using Postman or browser!');
});
