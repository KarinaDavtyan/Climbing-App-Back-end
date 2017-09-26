const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  category: String,
  avatar: String,
  points: {type: Number, default: 0}
})

const User = mongoose.model('User', userSchema);

module.exports = User;
