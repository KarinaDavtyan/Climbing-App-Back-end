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

//to avoid confusion, 'wall' may be used instead of 'route' - the climbing term

router.get('/routes', wallsController.getAllWalls);
// router.get('/routes/:id', wallsController.getWall);
// router.post('./routes', wallsController.postWall);
// router.post('./completion', wallsController.switchToComplete);
// router.post('./routes/:id/comment', wallsController.commentRoute);
//
// router.post('./users', usersController.createUser); //?? what is it doing
// router.get('./sign-in', usersController.signIn);
// router.get('./me', usersController.showMe);

module.exports = router;
