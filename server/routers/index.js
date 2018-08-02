const router = require('koa-router')();

const error = require('./error');
const home = require('./home');
const user = require('./user');

router.use('/', home.routes(), home.allowedMethods());

router.use('/user', user.routes(), user.allowedMethods());

router.use('/error', error.routes(), error.allowedMethods());

module.exports = router;