/**
 * Created by liuwei on 2018/1/21.
 */
const conditional = require('koa-conditional-get');    // 与koa-etag并用监测请求信息是否更新，更新则返回新内容，否则返回304，由客户端加载缓存页面
const etag = require('koa-etag');
const compose = require('koa-compose');    // 整合中间件
const serve = require('koa-static');    // 静态文件路径
const LRU = require('lru-cache');    // 热存储
const staticCache = require('koa-static-cache');    // 网络请求热存储
const compress = require('koa-compress');    // 压缩数据
const bodyParser = require('koa-bodyparser');    // 解析请求结构
const logger = require('koa-logger');
const error = require('koa-error');    // 返回错误模版
const easyMonitor = require('easy-monitor');    // 系统状态监视
easyMonitor('thirdday');
const Koa = require("koa");
const Router = require('koa-router');
const user = require('./../@thirdday/user');
const Redis = require('./../@thirdday/db-redis');
const oAuth = require('./../@thirdday/oAuth');

const app = new Koa();
const router = new Router();
const config = require("./config.js");

// 服务设置
app.keys = ['token'];
//app.proxy = true;    // 是否使用代理，在cookies设置为使用HTTPS设置并且服务使用代理运行时，必须设置为true


// TODO：conditional, etag待测试
app.use(compose([conditional(), etag(),compress(config.compress), bodyParser(config.bodyParser), logger(), error(config.error)]));
app.use(function(ctx, next){
    ctx.response.set('Content-Type', 'application/json');
    return next();
})
Redis.start();
oAuth.start(app,{});
user.start(router,{});



// 重定向，重定向后没有请求参数
router.get("/testServer", (ctx, next) => {
    console.log("----");
    ctx.redirect('/testServer_Copy');
    next();
})
router.get("/testServer_Copy", (ctx, next) => {
    console.log("=====",ctx.query);
    ctx.body = 'Hello World!';
})
router.get("/haha", (ctx, next) => {
    console.log("=====",typeof ctx.params);
    ctx.body = 'Hello World';
})
router.post("/haha", (ctx, next) => {
    console.log("=====",typeof ctx.request.body,ctx.request.body);
    ctx.body = 'Hello World';
})

// 静态文件路径
//app.use(serve(__dirname + '/public'));
// 热存储
//var files = new LRU({ max: 1000 })
//app.use(staticCache({
//    dir: '/public',
//    dynamic: true,
//    files: files
//}))
app
    .use(router.routes())
    .use(router.allowedMethods());


// 监听错误信息
app.on('error', function(err, ctx){
    console.error('server error msg', err);
    console.error('server error context', ctx);
});

app.listen(4000);