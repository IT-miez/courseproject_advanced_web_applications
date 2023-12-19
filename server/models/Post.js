const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String },
  code: { type: String },
  creator: { type: String },
  creationdate: { type: String },
});

module.exports = mongoose.model('posts', postSchema);
