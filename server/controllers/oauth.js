
const config = require('../config');
const request = require('request');
const jwt = require('jsonwebtoken');


const codeToAccessToken = async ctx => {
	let url = `https://github.com/login/oauth/access_token?client_id=f2662b7c806033f69284&client_secret=fb7c354cc50c148d587d0ffa73a0a5a6610028dc&code=${ctx.request.query.code}`
	let access_token = 	await	new Promise((resolve, reject) => {
		 request(url, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				let access_token = getUrlParam('?'+body, 'access_token');
				resolve(access_token);
			}
			reject(error);
		})
	})
	let userInfo = 	await	new Promise((resolve, reject) => {
		request({
			url: `https://api.github.com/user?access_token=${access_token}`,
			headers: {
				'Authorization': `token ${access_token}`,
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
			}
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				console.info(body, '------body')
				resolve(body);
			}
			reject(error);
			})
	})
	 
	const userToken = {
		username: userInfo.login,
		password: userInfo.id
	}
	const token = jwt.sign(userToken, config.secretSign, {expiresIn: '1h'})	 
	//ctx.body = { success: true, message: '登录成功', token}
	if(userInfo) {
		ctx.cookies.set(
			"token",
			token,
			{
				domain: 'localhost',  // 写cookie所在的域名
				path: '/',       // 写cookie所在的路径
				maxAge: 24 * 10 * 60 * 1000, // cookie有效时长
				// expires: new Date('2017-02-15'),  // cookie失效时间
				httpOnly: false,  // 是否只用于http请求中获取
				overwrite: true,  // 是否允许重写
			}
		)
		ctx.redirect(`http://localhost:8080/login`);
	}
}

const getUrlParam = (url, name) => {
	const result = url.match(new RegExp('(\\?|&)' + name + '=(.*?)(&|$)'));
	return result && decodeURIComponent(result[2])
}



module.exports = { codeToAccessToken }