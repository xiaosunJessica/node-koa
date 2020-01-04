const router = require('koa-router')();
const userController = require('../controllers/user');

const routers = router
	.get('/getUserInfo', userController.getUserInfo)
	.post('/login', userController.login)
	.post('/signIn', userController.signIn)

module.exports = routers

