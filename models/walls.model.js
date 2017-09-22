const mongoose = require('mongoose');

const wallSchema = mongoose.Schema({
  name: String,
  path: String,
  difficulty: String,
  gym: String,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rating: Number,
  votes: Number,
})

const Wall = mongoose.model('Wall', wallSchema);

module.exports = Wall;
