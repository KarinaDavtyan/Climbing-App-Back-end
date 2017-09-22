const Completion = require('../models/completion.model')
const moment = require('moment');

const User = require('../models/users.model');
const Wall = require('../models/walls.model');

const completeWall = async (ctx, next) => {
  try {
    let getRandomId = function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    let completion = new Completion({
      date: moment(),
      rating: ctx.request.body.rating,
      user: ctx.user._id,
      wall: ctx.request.body.wall
    })
    await completion.save();
    ctx.status = 201;
  } catch (e) {
    console.log("ERROR in completion",e);
  }
}

module.exports = {
  completeWall
}
