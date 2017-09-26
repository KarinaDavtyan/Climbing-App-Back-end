const mongoose = require('mongoose');

const wallSchema = mongoose.Schema({
  name: String,
  date: Date,
  path: String,
  difficulty: String,
  gym: String,
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  rating: Number,
  votes: Number,
})

wallSchema.methods.points = function() {
  switch (this.difficulty) {
    case '6a':
      return 100;
      break;
    case '7a':
      return 250;
    case '8a':
      return 500;
    default:
      return 0
  }
}

const Wall = mongoose.model('Wall', wallSchema);

module.exports = Wall;
