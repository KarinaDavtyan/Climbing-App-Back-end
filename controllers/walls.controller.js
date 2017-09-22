const mongoose = require('mongoose');

const Wall = require('../models/walls.model');
const User = require('../models/users.model');

const getAllWalls = async (ctx, next) => {
  ctx.body = await Wall.find();
  console.log("we just got all the routes!");
}

const getWall = async (ctx, next) => {
  let wall = await Wall.findOne({name: ctx.params.name});
  try {
    if (wall) {
      ctx.body = wall;
      console.log('we found the route!!!');
    } else {
      console.log('we dont have a route in the db');
      ctx.status = 404;
    }
  } catch (e) {
    console.error('error', e.message);
  }
}

const postWall = async (ctx, next) => {
  let wall = await Wall.findOne({name: ctx.request.body.name});
  if (!wall) {
    try {
      console.log(ctx.request.body);
      let wall = new Wall({
        name: ctx.request.body.name,
        path: ctx.request.body.path,
        difficulty: ctx.request.body.difficulty,
        gym: ctx.request.body.gym,
      　creator: ctx.user._id
      })
      await wall.save();
      console.log('wall is saved');
      ctx.status = 201;
    } catch (e) {
      console.log(e);
    }
  } else {
    ctx.body = 'The route title is already taken';
    console.log('choose another wall name');
  }
}

module.exports = {
  getAllWalls,
  getWall,
  postWall
}
