const Koa = require('koa');
let app = new Koa();
const logger = require('koa-logger');
const cors = require('kcors');
var bodyParser = require('koa-bodyparser');
const KoaJWT = require('koa-jwt');
const jwt = require('jsonwebtoken');

const router = require('./routes.js');
const User = require('./models/users.model');
require('./db');

app.use(logger());
app.use(cors());
app.use(
  koaBody({
    multipart: true,
  })
)
// app.use(bodyParser());

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

app.use(KoaJWT({ secret: jwtSecret}).unless({path: ['/sign-in', '/routes', '/users', '/ranking', '/points']}));

// Middleware for authenticating the user
app.use(async (ctx, next) => {
  // Getting the content of authorization header and
  // setting ctx.user to be the user binded to the token
  if (ctx.headers['authorization']) {
    const authorization = ctx.headers['authorization'];
    const [strategy, token] = authorization.split(' ');
    if(strategy !== 'Bearer') return await next();
    const tokenData = jwt.verify(token, jwtSecret);
    console.log(tokenData);
    ctx.user = await User.findOne({username:tokenData.username});
    await next();
  } else {
    await next();
  }
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');
