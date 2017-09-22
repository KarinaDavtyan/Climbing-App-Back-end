const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users.model');
const filterProps = require('../helpers').filterProps;

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
    console.log(user);
    if (matching) {
      let userToken = jwt.sign(
        {  username: user.username  },
        'i?!haTe!?cLimbinG!&!150_',
        { expiresIn: '1h' }
      );
      console.log(userToken);
      let userData = filterProps(user.toObject(), ['username', 'category', 'avatar', 'points']);
      ctx.body = {
        "token": userToken,
        "user": userData
      }
      ctx.status = 200;
      console.log("User", username, "signed-in");
      return;
    } else {
      console.log('wrong password');
      ctx.body = {
        message: 'Wrong credentials'
      };
      throw new Error();
    }
  } catch (e) {
    console.log('error is catched', e);
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
