const mongoose = require('mongoose');

const completionSchema = mongoose.Schema({
  date: Date,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  wall: String
})

const Completion = mongoose.model('Completion', completionSchema);

module.exports = Completion;
