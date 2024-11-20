// Import the User model
const User = require('../models/user');

// CREATE: Add a new user
const createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = User.create(name, email);
  res.status(201).json(newUser);
};

// READ: Get all users
const getAllUsers = (req, res) => {
  const users = User.getAll();
  res.json(users);
};

// READ: Get a single user by ID
const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = User.getById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

// UPDATE: Update a user's details by ID
const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  const updatedUser = User.update(userId, name, email);

  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(updatedUser);
};

// DELETE: Delete a user by ID
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const deleted = User.delete(userId);

  if (!deleted) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User deleted' });
};

// GET COUNT: Return the current count of users
const getUsersCount = (req, res) => {
  const count = User.getCount();
  res.json({ count });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersCount
};
