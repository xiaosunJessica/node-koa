const session = require('koa-session');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
// const handle = app.getRequestHandler();

const routers = require('./routers/index');

app.use(bodyParser());

app.keys = ['some secret hurry'];

const CONFIG = {
	key: 'koa:sess',
	maxAge: 86400000,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: true,
	renew: true,
}

// session设置
app.use(session(CONFIG, app))

//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods)


app.on('error', (err, ctx) => {
	console.error('server error', err)
})

app.listen(3000, '127.0.0.1', () => {
	console.info('listen 3000')
})