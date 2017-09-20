const Wall = require('../models/walls.model')

const getAllWalls = async (ctx, next) => {
  ctx.body = await Wall.find();
  console.log("we just got all th routes!");
}

// const getWall = async (ctx, next) => {
//
// }
//
// const postWall = async (ctx, next) => {
//   let wall =
//
// }
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
  getAllWalls
}
