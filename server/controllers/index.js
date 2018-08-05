module.exports = async (ctx, next) => {
	const title = 'home';
  console.info('homes')
	await ctx.render('index', {title})
}