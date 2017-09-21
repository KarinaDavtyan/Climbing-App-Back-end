const Wall = require('../models/walls.model')

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
  console.log("we are in the postWall");
  let wall = await Wall.findOne({name: ctx.params.name});
  if (!wall) {
    try {
      console.log(ctx.request.body);
      let wall = new Wall({
        name: ctx.request.body.name,
        path: ctx.request.body.path,
        difficulty: ctx.request.body.difficulty,
        gym: ctx.request.body.gym,
        creator: ctx.request.body.user
        // user: ctx.user._id //pseudo !!!
      })
      await wall.save();
      console.log('wall is saved');
      ctx.status = 201;
    } catch (e) {
      console.log(e);
    }
  } else {
    ctx.body = 'The route name is already used'
    console.log('choose another wall name');
  }
}
// const switchToComplete = async (ctx, next) => {
//
// }
// const wallsController = async (ctx, next) => {
//
// }
// const createUser = async (ctx, next) => {
//
// }
// const signIn= async (ctx, next) => {
//
// }
// const showMe= async (ctx, next) => {
//
// }

module.exports = {
  getAllWalls,
  getWall,
  postWall
}
