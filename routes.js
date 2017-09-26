'use strict'
const router = require('koa-router')();

const wallsController = require('./controllers/walls.controller');
const usersController = require('./controllers/users.controller');
const completionController = require('./controllers/completion.controller');

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
router.get('/ranking', usersController.getAllUsers);
router.get('/routes/:name', wallsController.getWall);
router.post('/route', wallsController.postWall);


router.post('/users', usersController.createUser);
router.get('/sign-in', usersController.signIn);
router.get('/me', usersController.showMe);


router.post('/completion', completionController.completeWall);

// router.post('/routes/:name/comment', wallsController.commentRoute);

let options = async function() {
  this.body = "Allow: HEAD,xGET,PUT,DELETE,OPTIONS";
  ;}

router.options('/', options);

module.exports = router;
