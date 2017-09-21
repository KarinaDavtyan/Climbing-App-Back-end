const User = require('../models/users.model');
const bcrypt = require('bcrypt');

const createUser = async (ctx, next) => {
  let user = await User.findOne({username: ctx.request.body.username});
  if (user) {
    ctx.status = 400;
    ctx.body = {
      errors: [
        "Username already exists."
      ]
    }
  } else {
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(ctx.request.body.password, saltRounds);
    console.log(hashedPassword);
    const user = new User({
      username: ctx.request.body.username,
      password: hashedPassword,
      category: ctx.request.body.category,
      avatar: ctx.request.body.avatar,
      points: ctx.request.body.points
    })
    console.log('Creating user ...');
    await user.save();
    ctx.status = 201;
  }
}
// const signIn = async (ctx, next) => {
//
// }
const showMe= async (ctx, next) => {
  console.log('showing user', ctx.body);
  ctx.body = ctx.user;
}



module.exports = {
  createUser,
  showMe

}
