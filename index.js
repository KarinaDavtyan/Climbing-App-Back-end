const Koa = require('koa');
let app = new Koa();
const logger = require('koa-logger');
const cors = require('kcors');
var bodyParser = require('koa-bodyparser');
const router = require('./routes.js');
const jwt = require('koa-jwt');
require('./db');

const User = require('./models/users.model');

app.use(logger());
app.use(cors());
app.use(bodyParser());

// Middleware for authenticating the user
app.use(async (ctx, next) => {
  // const authorization = ctx.headers['authorization'];
  // console.log(authorization);
  // const token = authorization.split(' ')[1];
  // if(token)
  ctx.user = await User.findOne({username:'Karina'});
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

// app.use(jwt({ secret: 'climbing' }));
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
