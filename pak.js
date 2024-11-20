const express = require('express');
const app = express();
const port = 3000;

// Use built-in express.json() middleware (no need for body-parser)
app.use(express.json());

// Import controller for users
const userController = require('./controllers/userController');

// Routes
app.post('/users', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);
app.get('/users-count', userController.getUsersCount);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
