const Completion = require('../models/completion.model')
const moment = require('moment');

const User = require('../models/users.model');
const Wall = require('../models/walls.model');

const completeWall = async (ctx, next) => {
  let completion = await Completion.findOne({id: ctx.request.body.id});
  if (!completion) {
    try {
      let getRandomId = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let completion = new Completion({
        date: moment(),
        rating: ctx.request.body.rating,
        // user: ctx.user._id,
        // wall: ctx.wall._id,
        id: getRandomId(1, 1000)
      })
      await completion.save();
      ctx.status = 201;
    } catch (e) {
      console.log("ERROR in completion",e);
    }
  } else {
    ctx.body = 'You\'ve already finished this route!';
    console.log('Wall was completed by the user already');
  }
}

module.exports = {
  completeWall
}
