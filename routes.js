'use strict'
const router = require('koa-router')();

const wallsController = require('./controllers/walls.controller');
// const usersController = require('./controllers/usersController';)

// const authorize = async (ctx, next) => {
//   console.log('authorized');
//   console.log(ctx.state.user);
//   if (!ctx.state.user) {
//     ctx.status = 401;
//     return;
//     }
//   await next();
// }

let options = async function() {
  this.body = "Allow: HEAD,GET,PUT,DELETE,OPTIONS";
};
//to avoid confusion, 'wall' may be used instead of 'route' - the climbing term

router.get('/routes', wallsController.getAllWalls);
router.get('/routes/:name', wallsController.getWall);
router.post('/routes', wallsController.postWall);
// router.post('./completion', wallsController.switchToComplete);
// router.post('./routes/:name/comment', wallsController.commentRoute);
//
// router.post('./users', usersController.createUser); //?? what is it doing
// router.get('./sign-in', usersController.signIn);
// router.get('./me', usersController.showMe);

router.options('/', options);

module.exports = router;
