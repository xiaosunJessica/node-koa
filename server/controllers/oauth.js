
const config = require('../config');
const request = require('request');


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
	console.info(access_token, '-----accs---')
	let userInfo = 	await	new Promise((resolve, reject) => {
		console.info('-------userinfo')
		request({
			url: `https://api.github.com/user?access_token=${access_token}`,
			headers: {
				'Authorization': `token ${access_token}`,
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
			}
		}, function (error, response, body) {
		console.info(response, '-----response----') 
		if (!error && response.statusCode == 200) {	 
			 resolve(body);
		 }
		 reject(error);
	 })
 })

 console.info(userInfo, '-----userInfo')

}

const getUrlParam = (url, name) => {
	const result = url.match(new RegExp('(\\?|&)' + name + '=(.*?)(&|$)'));
	return result && decodeURIComponent(result[2])
}



module.exports = { codeToAccessToken }