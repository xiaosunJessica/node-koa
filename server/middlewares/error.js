const errorHandle = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		if (err.status === 401) {
			ctx.status = 401;
			ctx.body = {
				message: '登录失效',
				success: false,
				status: 401
			}
			ctx.redirect
		} else {
			throw err;
		}
	}
}

// export default errorHandle 
module.exports = errorHandle