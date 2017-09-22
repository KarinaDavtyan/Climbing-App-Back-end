const User = require('../models/users.model');
const bcrypt = require('bcrypt');

const filterProps = require('../helpers').filterProps; ///??? why?

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
    const user = new User({
      username: ctx.request.body.username,
      password: hashedPassword,
      category: ctx.request.body.category,
      avatar: ctx.request.body.avatar,
      points: ctx.request.body.points
    })
    console.log('Creating user ...');
    let newUser = await user.save();
    // console.log('user', user._doc);
    ctx.body = filterProps(user.toObject(), ['username', 'category', 'avatar', 'points']);
    console.log(newUser);
    console.log(ctx.body);
    ctx.status = 201;
  }
}

const signIn = async (ctx, next) => {
  const auth = ctx.request.headers.authorization;
  const base64 = auth.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString("ascii");
  const [username, password] = decoded.split(':');
  const user = await User.findOne({username});
  console.log(username, password);
  try {
    if (user === null) throw new Error();
    const matching = await bcrypt.compare(password, user.password);
    if (matching) {
      ctx.body = filterProps(user.toObject(), ['username', 'category', 'avatar', 'points']);
      ctx.status = 200;
      console.log("User", username, "signed-in");
      return;
    } else throw new Error();
  } catch (e) {
    ctx.body = {
      message: 'Wrong credentials'
    };
    ctx.status = 401;
    return;
  }
}

const showMe= async (ctx, next) => {
  console.log('showing user', ctx.body);
  ctx.body = ctx.user;
}



module.exports = {
  createUser,
  signIn,
  showMe
}
