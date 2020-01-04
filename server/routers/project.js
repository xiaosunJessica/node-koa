const router = require('koa-router')();
const projectController = require('../controllers/project');

const routers = router
	.post('/add', projectController.addProject)
	.post('/edit', projectController.editProject)
	.get('/list', projectController.list)
	.get('/detail', projectController.detail)
	.delete('/delete', projectController.deleteProject)

module.exports = routers

