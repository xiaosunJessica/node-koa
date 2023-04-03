

const Project = require('../models/project');
const getJWTPayload = require('../util/verifyJwt').getJWTPayload

let users = {
	
}
let userInfo = {

}
const ws = async ctx => {
  ctx.websocket.on('message', function(token) {
		// do something with the message from client
		if (token) {
			userInfo = getJWTPayload(token);
			users[userInfo.username] = ctx.websocket;
			sendWs(ctx)
		}
	});
}

const sendWs = async (ctx) => {
	const data = await Project.find();
	const userList = Object.keys(users);
	userList.forEach(u => {
		console.info(u, userList)
		users[u].send(data.length);
	})
}

module.exports = { ws, sendWs }