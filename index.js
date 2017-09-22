const Koa = require('koa');
let app = new Koa();
const logger = require('koa-logger');
const cors = require('kcors');
var bodyParser = require('koa-bodyparser');
const router = require('./routes.js');
const KoaJWT = require('koa-jwt');
const jwt = require('jsonwebtoken');
require('./db');

const User = require('./models/users.model');

app.use(logger());
app.use(cors());
app.use(bodyParser());

const jwtSecret = 'i?!haTe!?cLimbinG!&!150_';

app.use(KoaJWT({ secret: jwtSecret}).unless({path: ['/sign-in', '/routes', '/users']}));
// Middleware for authenticating the user
app.use(async (ctx, next) => {
  // Getting the content of authorization header and
  // setting ctx.user to be the user binded to the token
  const authorization = ctx.headers['authorization'];
  const [strategy, token] = authorization.split(' ');
  if(strategy !== 'Bearer') return await next();

  const tokenData = jwt.verify(token, jwtSecret);
  console.log(tokenData);
  // if(token)
  ctx.user = await User.findOne({username:tokenData.username});
  await next();
})

// app.use(function(ctx, next){
//   return next().catch((err) => {
//     if (401 == err.status) {
//       ctx.status = 401;
//       ctx.body = 'Protected resource, use Authorization header to get access\n';
//     } else {
//       throw err;
//     }
//   });
// });

//
// app.use(function(ctx){
//   if (ctx.url.match(/^\/sign-in/) && ctx.url.match(/^\/me/) ) {
//     ctx.body = 'protected\n';
//   }
// });

// app.use(async (ctx, next) => {
//   // Get content of Authorization header
//   const header = ctx.headers['authorization']
//   const token = header.split(' ')[1];
//   // const info = token.jwtDecode()
//
//   const user = await User.find({username: username});
//
//   ctx.user = user;
// });

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(3000);
console.log('listening on port 3000');
