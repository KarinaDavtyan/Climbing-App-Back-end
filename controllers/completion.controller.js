const moment = require('moment');

const User = require('../models/users.model');
const Wall = require('../models/walls.model');
const Completion = require('../models/completion.model')

const completeWall = async (ctx, next) => {
  try {
    let getRandomId = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let completion = new Completion({
      date: moment(),
      rating: ctx.request.body.rating,
      user: ctx.user._id,
      wall: ctx.request.body.name
    })
    await completion.save();

    // Add points to the user
    // let user = await User.findOne({name: ctx.request.body.name});
    console.log(ctx.request.body.name);
    const wall = await Wall.findOne({name: ctx.request.body.name});
    console.log(wall);
    console.log(wall.points());
    await User.findOneAndUpdate({_id: ctx.user._id}, {
      $inc: { points: wall.points() }
    })

    ctx.status = 201;
  } catch (e) {
    console.log("error is catched", e);
  }
}

module.exports = {
  completeWall
}
