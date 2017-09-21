'use strict'
const router = require('koa-router')();

const wallsController = require('./controllers/walls.controller');
const usersController = require('./controllers/users.controller');

// const authorize = async (ctx, next) => {
//   console.log('authorized');
//   console.log(ctx.state.user);
//   if (!ctx.state.user) {
//     ctx.status = 401;
//     return;
//     }
//   await next();
// }

//to avoid confusion, 'wall' may be used instead of 'route' - the climbing term

router.get('/routes', wallsController.getAllWalls);
router.get('/routes/:name', wallsController.getWall);
router.post('/routes', wallsController.postWall);

router.post('/users', usersController.createUser);
// router.get('./sign-in', usersController.signIn);
router.get('/me', usersController.showMe);

// router.post('./completion', wallsController.completeWall);

// router.post('./routes/:name/comment', wallsController.commentRoute);

let options = async function() {
  this.body = "Allow: HEAD,GET,PUT,DELETE,OPTIONS";
  ;}
router.options('/', options);

module.exports = router;
