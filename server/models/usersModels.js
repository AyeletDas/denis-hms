
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema( // Create an object by create a schema
  {
    email: String,
    firstname:  String,
    lastname: String,
    password: String
  },
  { versionKey: false }  // If I don't want _v line

);

module.exports = mongoose.model('User', usersSchema); // I need to provide: 1. name of the collection in the singular (Capital letter)=>"users"
                                                                            // 2. name of schema




