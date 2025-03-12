const mongoose = require('mongoose'); // connection to Database

const connectDB = () => { // The function at the end I will run at main.js
  mongoose
    .connect('mongodb://127.0.0.1:27017/userdb') // Returns a promise (success or rejected)
    .then(() => { // If successful
      console.log('Connected to userdb and works perfectly');
    })
    .catch((error) => { // If rejected
      console.error('Error connecting to database:', error);
    });
};

module.exports = connectDB;
