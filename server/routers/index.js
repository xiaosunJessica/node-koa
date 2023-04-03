const router = require('koa-router')();

const error = require('./error');
const home = require('./home');
const user = require('./user');
const project = require('./project');
const oauth = require('./oauth');

router.use('/', home.routes(), home.allowedMethods());

router.use('/home', home.routes(), home.allowedMethods());

router.use('/user', user.routes(), user.allowedMethods());

router.use('/error', error.routes(), error.allowedMethods());

router.use('/project', project.routes(), project.allowedMethods());

router.use('/oauth', oauth.routes(), oauth.allowedMethods());

module.exports = router;