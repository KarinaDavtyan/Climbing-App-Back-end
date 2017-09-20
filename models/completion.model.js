const mongoose = require('mongoose');

const completionSchema = mongoose.Schema({
  date: Date,
  rating: Number,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  wall: {type: mongoose.Schema.Types.ObjectId, ref: 'Wall'}
})

const Completion = mongoose.model('Completion', completionSchema);

module.exports = Completion;

// const completionSchema = mongoose.Schema({
//   date: Date,
//   rating: Number,
//   user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//   wall: {type: mongoose.Schema.Types.ObjectId, ref: 'Wall'}
// })


// // When creating the completion
// new Completion({
//   user: ctx.user._id,
//   wall: ctx.request.body.wall_id
// })
