const UserController = require('../controllers/UserController');
const express = require('express');

const userRouter = express.Router();

// Create a new user
userRouter.post('/register', UserController.createUser);
// Get all users
userRouter.get('/users', UserController.getUsers);
// Get a user by ID
userRouter.get('/users/:id', UserController.getUserById);
// Update a user by ID
userRouter.put('/users/:id', UserController.updateUser);
// Delete a user by ID
userRouter.delete('/users/:id', UserController.deleteUser);
// Login a user
userRouter.post('/login', UserController.loginUser);
// Export the router
module.exports = userRouter;