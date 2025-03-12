// models -> Repo -> Service - > Controller - > index.js

const userRepo = require('../repositories/usersRepo');
const bcrypt = require('bcrypt') // for POST + PUT requests

// GET all users from DB - GET - http://localhost:4000/api/users
const getAllUsers = async () => {
  try {
    const users = await userRepo.getAllUsers();
    return users;
  } catch (error) {
    throw new Error('Failed to get users - usersService.js');
  }
};

// Get and find user by ID - GET - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
const getUserById = async (userId) => {
  try {
    const user = await userRepo.getUserById(userId);
    return user;
  } catch (error) {
    throw new Error('Failed to get user : ' + error.message + ' - usersService.js');
  }
};

// Create a new user - POST - http://localhost:4000/api/users
const addUser = async (obj) => {
  try {
    if (!obj.email || !obj.firstname || !obj.lastname || !obj.password) {
      throw new Error('All fields are required - usersService.js');
    }
    const bcryptPassword = await bcrypt.hash(obj.password, 10);
    const userData = {
      email: obj.email,
      firstname: obj.firstname,
      lastname: obj.lastname,
      password: bcryptPassword
    };
    const { _id: userId } = await userRepo.addUser(userData); // const { _id: userId }: I take the _id from userRepo (which came automatically from MongoDB) and save as userId.
    console.log(bcryptPassword)
    console.log(" ##### Just for testing! I don't upload this to the production! ##### password:" + obj.password)
    return userId;
  } catch (error) {
    throw new Error('Failed to add user: ' + error.message + ' - usersService.js');
  }
};

// Update a user by ID - PUT - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
const updateUser = async (userId, updatedData) => {
  try {
    if (updatedData.password) { // If the user reset password
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }
    const updatedUser = await userRepo.updateUser(userId, updatedData);
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user: ' + error.message + ' - usersService.js');
  }
};

// Delete a user by ID - DELETE - http://localhost:4000/api/users/67d023dbdd4c27ac880befd3
const deleteUser = async (userId) => {
  try {
    const deletedUser = await userRepo.deleteUser(userId);
    return deletedUser;
  } catch (error) {
    throw new Error('Failed to delete user: ' + error.message + ' - usersService.js');
  }
};

// User login - POST - http://localhost:4000/api/users/login
const getFullDataForlogin = async (email, password) => {
  try {
    const user = await userRepo.getUserByEmail(email);
    if (!user) {
      console.log('User not found - usersService.js')
      console.log(" ##### Just for testing! I don't upload this to the production! ##### password:" + obj.password)

      throw new Error('User not found');
    }
    const passwordIsMatchToBcrypt = await bcrypt.compare(password, user.password);
    if (!passwordIsMatchToBcrypt) {
      console.log('Invalid password - usersService.js')
      throw new Error('Invalid password');
    }
    return user;
  } catch (error) {
    throw new Error('error from getFullDataForlogin - usersService.js' + error);
  }
};

// for User login 
const getUserByEmail = async (email) => {
  try {
    const user = await userRepo.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Failed to get user by email: ' + error.message);
  }
};

module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser, getFullDataForlogin, getUserByEmail };