const mongoose = require('mongoose');

const completionSchema = mongoose.Schema({
  date: Date,
  rating: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  wall: {type: mongoose.Schema.Types.ObjectId, ref: 'Wall'},
  id: Number
})

const Completion = mongoose.model('Completion', completionSchema);

module.exports = Completion;
