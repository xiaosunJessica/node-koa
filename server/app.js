// const session = require('koa-session');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const jwt = require('koa-jwt');
const mongoose = require('mongoose');
const app = new Koa();
const config = require('./config');
const cors = require('koa2-cors');
// import require方式
// const errorHandle = require("./middlewares/error"); 
import errorHandle from "./middlewares/error";

const routers = require('./routers/index');
app.use(errorHandle)
app.use(views(__dirname + '/views', {
	extension: 'ejs'
}));
app.use(cors())
app.use(bodyParser());
app.use(jwt({ secret: config.secretSign }).unless({path: [/^\/user\/login/, /^\/user\/signIn/]}));
//初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods);



mongoose.connect('mongodb://127.0.0.1:27017/node-koa')


app.on('error', (err, ctx) => {
	console.error('server error', err)
})

app.listen(3000, '127.0.0.1', () => {
	console.info('listen 3000')
})