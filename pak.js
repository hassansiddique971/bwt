const express = require('express');

const app = express();
const port = 3000;

// Use built-in express.json() middleware (no need for body-parser)
app.use(express.json());
const express = require('express');

// In-memory user storage
let users = [];
let userCounter = 0; // Counter for the number of users

// CREATE: Add a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Validation check
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Create new user
  const newUser = { id: ++userCounter, name, email };
  users.push(newUser);

  // Respond with the created user
  res.status(201).json(newUser);
});

// READ: Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// READ: Get a single user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// UPDATE: Update a user's details by ID
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update user fields if provided
  if (name) user.name = name;
  if (email) user.email = email;

  // Respond with the updated user
  res.json(user);
});

// DELETE: Delete a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Delete the user
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted' });
});

// GET COUNT: Return the current count of users
app.get('/users-count', (req, res) => {
  res.json({ count: users.length });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

