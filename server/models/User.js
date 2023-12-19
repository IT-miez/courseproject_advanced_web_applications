const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String },
  password: { type: String },
  bio: { type: String },
  creationdate: { type: String },
});

module.exports = mongoose.model('users', userSchema);
