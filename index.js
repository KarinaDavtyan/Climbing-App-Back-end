const Koa = require('koa');
let app = new Koa();
const logger = require('koa-logger');
const cors = require('kcors');
const router = require('./routes.js');
require('./db');

app.use(logger());
app.use(cors());

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
