// models -> Repo -> Service - > Controller - > index.js

const User = require('../models/usersModels');

// GET all users from DB - GET - http://localhost:4000/api/users
const getAllUsers = async () => {
  try {
    const user = await User.find({});
    return user;
  } catch (error) {
    throw new Error('Failed to get User from database - usersRepo.js');
  }
};

// Get and find user by ID - GET - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Failed to get userId from database - usersRepo.js');
  }
};

// Create a new user - POST - http://localhost:4000/api/users
const addUser = (obj) => {
  try {
    const user = new User(obj); // obj= Creating a structure of the document using this model.
    return user.save(); // save into the database. Returns the ID of the document I created
  } catch (error) {
    throw new Error('Failed to create new user - usersRepo.js');
  }
};

// Update a user by ID - PUT - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
const updateUser = async (userId, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }); //{ new: true } = new obj
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user in database - usersRepo.js');
  }
};

// Delete a user by ID - DELETE - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    throw new Error('Failed to delete user from database - usersRepo.js');
  }
};

// User login - POST - http://localhost:4000/api/users/login
const getFullDataForlogin = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error('Failed to login - Email is missing - usersRepo.js');
  }
};

// for User login 
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser, getFullDataForlogin, getUserByEmail };