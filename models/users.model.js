const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  category: String,
  avatar: String,
  points: Number
})

const User = mongoose.model('User', userSchema);

module.exports = User;
