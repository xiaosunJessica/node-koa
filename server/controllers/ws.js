

const Project = require('../models/project');
const ws = async ctx => {
	const data = await Project.find();
	console.info(data, '-----data')
	ctx.websocket.send(data.length);
  ctx.websocket.on('message', function(message) {
    // do something with the message from client
		console.log(message, '----message-----');
  });
}

module.exports = { ws }