const router = require('koa-router')();
const index = require('../controllers/index');

router.get('/', (ctx, next) => {
	ctx.response.body = 'hello home'
})

module.exports = router;