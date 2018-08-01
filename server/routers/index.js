const router = require('koa-router')();

const error = require('./error');
const home = require('./home');

router.use('/', home.routes(), home.allowedMethods())

router.use('/error', error.routes(), error.allowedMethods())

module.exports = router;