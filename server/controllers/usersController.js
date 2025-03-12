// models -> Repo -> Service -> Controller -> index.js

const userService = require('../services/usersService');
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtAuth = require('../auth/jwtAuth'); // Middleware for JWT - Verify that the request contains a valid JWT token.
const bcrypt = require('bcrypt')

require('dotenv').config();

// GET all users from DB - GET - http://localhost:4000/api/users
router.get('/', jwtAuth, async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users - usersController.js' });
  }
});

// Get and find user by ID - GET - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
router.get('/:id', jwtAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user - usersController.js' });
  }
});

// Create a new user - POST - http://localhost:4000/api/users
router.post('/register', async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    if (!email || !firstname || !lastname || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const result = await userService.addUser(req.body);
    const token = jwt.sign( // Creating a JWT token
      {
        id: result,
        email: email,
        firstname: firstname,
        lastname: lastname
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    // Cookie setting with token
    res.cookie('token', token, {
      httpOnly: true, // Restricts access to the cookie from the client.
      secure: process.env.NODE_ENV === 'production', // only from HTTPS 
      sameSite: 'strict' // sending cookie allow only to requests from the same place
    });
    res.status(201).json({ message: 'User created successfully', userId: result, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID - PUT - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
router.put('/:id', jwtAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User login - POST - http://localhost:4000/api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
    const user = await userService.getUserByEmail(email.toLowerCase().trim()); // Search the user in database
    console.log('User found:', user);

    const passwordIsMatchToBcrypt = bcrypt.compare(password.trim(), user.password);
    console.log('Password match to result:', passwordIsMatchToBcrypt);

    if (!passwordIsMatchToBcrypt) {
      return res.status(401).json({ error: 'Invalid password - usersController.js' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log('Login success for user:', email);

    return res.status(200).json({
      message: 'Login success',
      token,
      user: { publicId: user._id, name: `${user.firstname} ${user.lastname}`, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      error: 'Login error',
    });
  }
});

// Logout - http://localhost:4000/api/users/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Removes the token from localStorage
  res.status(200).json({ message: 'Logout success' });
});

// Delete a user by ID - DELETE - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
router.delete('/:id', jwtAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
