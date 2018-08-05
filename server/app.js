// const session = require('koa-session');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const jwt = require('koa-jwt');
const mongoose = require('mongoose');
const app = new Koa();
// const handle = app.getRequestHandler();

const routers = require('./routers/index');

app.use(views(__dirname + '/views', {
	extension: 'ejs'
}));

app.use(bodyParser());

app.use(jwt({ secret: 'shared-secret', passthrough: true }));

//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods);



mongoose.connect('mongodb://127.0.0.1:27017/node-koa')


app.on('error', (err, ctx) => {
	console.error('server error', err)
})

app.listen(3000, '127.0.0.1', () => {
	console.info('listen 3000')
})