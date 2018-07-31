module.exports = async (ctx, next) => {
	console.info('------hello')
	const title = 'home';
	await ctx.render('index', {title})
}