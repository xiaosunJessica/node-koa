const router = require('koa-router')();

router.get('*', async (ctx, next) => {
  console.info('----------error')
	const title = 'error';
	await ctx.render('error', { title })
})

module.exports = router;