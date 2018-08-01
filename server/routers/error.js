const router = require('koa-router')();

router.get('*', async (ctx, next) => {
	const title = 'error';
	await ctx.render('error', { title })
})

module.exports = router;