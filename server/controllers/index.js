module.exports = async (ctx, next) => {
	const title = 'home';
	await ctx.render('index', {title})
}