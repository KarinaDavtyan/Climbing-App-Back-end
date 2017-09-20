const mongoose = require('mongoose');

const wallSchema = mongoose.Schema({
  name: String,
  path: String,
  difficulty: String,
  gym: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Wall = mongoose.model('Wall', wallSchema);

module.exports = Wall;
