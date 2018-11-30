const router = require('koa-router')();
const projectController = require('../controllers/project');

const routers = router
	.post('/add', projectController.addProject)
	.get('/list', projectController.list)
	.delete('/delete', projectController.deleteProject)

module.exports = routers

